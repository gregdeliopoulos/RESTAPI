import csv
import dataclasses
import io

from flask import Flask, jsonify, request, make_response
import db

app = Flask(__name__)


@app.route('/', methods=["GET"])
def home():
    return 'API for CORGIS Music data-set<br>' \
           '<a href="/songs">View songs</a><br>' \
           '<a href="/artists">View artists</a>'


@app.route('/artists', methods=["GET"])
def show_artists():
    conn = db.get_connection()
    cursor = conn.cursor()

    query = "SELECT * FROM music"
    filters = []
    options = []
    if request.args.get('name'):
        filters.append(f"artist_name LIKE '%{request.args.get('name')}%'")
    if request.args.get('genre'):
        filters.append(f"artist_terms LIKE '%{request.args.get('genre')}%'")

    if request.args.get('order_by'):
        order_by = request.args.get('order_by')

        # Make sure column is part of table
        cursor.execute("SELECT * FROM music LIMIT 1")
        columns = [desc[0] for desc in cursor.description]

        if order_by not in columns:
            return "Incorrect column name", 422
        else:
            ordering = f" ORDER BY cast({request.args.get('order_by')} as REAL)"
            if request.args.get('sort'):
                sorting = request.args.get('sort')
                if sorting in {"asc", "ascending", "ASC", "ASCENDING"}:
                    ordering += " ASC"
                elif sorting in {"dsc", "desc", "descending", "DSC", "DESC", "DESCENDING"}:
                    ordering += " DESC"
            elif True:  # Default option
                ordering += " DESC"
            options.append(ordering)

    if request.args.get('count'):
        options.append(f"LIMIT {request.args.get('count')}")

    filters_string = " AND ".join(filters)
    if filters_string != "":
        query = " WHERE ".join([query, filters_string])

    query += " ".join(options)
    print(query)
    cursor.execute(query)
    rows = cursor.fetchall()

    linked_artists = map(db.LinkedArtist.from_db_row, rows)

    if request.content_type in {"application/json", None}:
        return jsonify(list(linked_artists)[:50])
        # return jsonify(list(linked_artists)[:50], sort_keys=False)
    elif request.content_type == "text/csv":
        return create_csv_response(db.LinkedArtist, list(linked_artists)[:50])


@app.route('/artists/<string:artist_id>', methods=["GET"])
def show_artist(artist_id):
    conn = db.get_connection()
    cursor = conn.cursor()

    # TODO This should link to release/songs from this artist

    # TODO This should display metadata about the artist, including statistics about the popularity of the songs,
    #  optionally filtered by a specific year, such as mean, median and stddev. Also most recent release or something
    #  could be nice

    query = f"SELECT * FROM music WHERE artist_id = '{artist_id}'"

    cursor.execute(query)
    rows = cursor.fetchall()

    linked_artists = map(db.LinkedArtist.from_db_row, rows)

    if request.content_type in {"application/json", None}:
        return jsonify(list(linked_artists)[:50])
    elif request.content_type == "text/csv":
        return create_csv_response(db.LinkedArtist, list(linked_artists)[:50])


@app.route('/artists/<string:artist_id>/songs', methods=["GET"])
def show_artist_songs(artist_id):
    conn = db.get_connection()
    cursor = conn.cursor()

    query = "SELECT * FROM music"

    filters = []
    filters.append(f"artist_id = '{artist_id}'")
    if request.args.get('song_year'):
        filters.append(f"song_year LIKE '%{request.args.get('song_year')}%'")
    if request.args.get('genre'):
        filters.append(f"artist_terms LIKE '%{request.args.get('genre')}%'")

    filters_string = " AND ".join(filters)
    if filters_string != "":
        query = " WHERE ".join([query, filters_string])

    cursor.execute(query)
    rows = cursor.fetchall()

    linked_songs = map(db.LinkedSong.from_db_row, rows)

    if request.content_type in {"application/json", None}:
        return jsonify(list(linked_songs)[:50])
    elif request.content_type == "text/csv":
        return create_csv_response(db.LinkedSong, list(linked_songs)[:50])


@app.route('/songs', methods=["GET"])
def show_songs():
    # 1. Get data from database (with tailored query?)
    # 2. Convert data to list of objects
    # 3. Add links to objects
    # 4. Convert list to CSV/JSON
    # 5. Correct response headers

    conn = db.get_connection()
    cursor = conn.cursor()

    query = "SELECT * FROM music"
    filters = []
    options = []
    if request.args.get('year'):
        filters.append(f"song_year = '{request.args.get('year')}'")
    if request.args.get('artist_id'):
        filters.append(f"artist_id = '{request.args.get('artist_id')}'")

    if request.args.get('order_by'):
        order_by = request.args.get('order_by')

        # Make sure column is part of table
        cursor.execute("SELECT * FROM music LIMIT 1")
        columns = [desc[0] for desc in cursor.description]

        if order_by not in columns:
            return "Incorrect column name", 422
        else:
            ordering = f" ORDER BY cast({request.args.get('order_by')} as REAL)"
            if request.args.get('sort'):
                sorting = request.args.get('sort')
                if sorting in {"asc", "ascending", "ASC", "ASCENDING"}:
                    ordering += " ASC"
                elif sorting in {"dsc", "desc", "descending", "DSC", "DESC", "DESCENDING"}:
                    ordering += " DESC"
            elif True:  # Default option
                ordering += " DESC"
            options.append(ordering)

    if request.args.get('count'):
        options.append(f"LIMIT {request.args.get('count')}")

    filters_string = " AND ".join(filters)
    if filters_string != "":
        query = " WHERE ".join([query, filters_string])

    query += " ".join(options)

    print(query)
    cursor.execute(query)
    rows = cursor.fetchall()

    # TODO Add links to releases/songs
    linked_songs = map(db.LinkedSong.from_db_row, rows)

    if request.content_type in {"application/json", None}:
        return jsonify(list(linked_songs)[:50])
    elif request.content_type == "text/csv":
        return create_csv_response(db.LinkedSong, list(linked_songs)[:50])


@app.route('/songs/<string:song_id>', methods=["GET"])
def show_song(song_id):
    conn = db.get_connection()
    cursor = conn.cursor()

    query = f"SELECT * FROM music WHERE song_id = '{song_id}'"
    cursor.execute(query)
    rows = cursor.fetchall()

    songs = map(db.LinkedSong.from_db_row, rows)

    if request.content_type in {"application/json", None}:
        return jsonify(list(songs))
    elif request.content_type == "text/csv":
        return create_csv_response(db.LinkedSong, list(songs))


# TODO Deal with linking
def create_csv_response(instance_type, instances):
    si = io.StringIO()
    cw = csv.writer(si, delimiter=',')

    # Prepend a row containing the field names
    cw.writerow([field.name for field in dataclasses.fields(instance_type)])
    # Write out each row
    for instance in instances:
        cw.writerow(list(instance))

    response = make_response(si.getvalue())
    response.headers["Content-type"] = "text/csv"
    return response


# DEBUG
# from https://stackoverflow.com/a/42286498
@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

if __name__ == '__main__':
    app.run()
