import csv
import dataclasses
import io

from flask import Flask, jsonify, request, make_response
import db
from exception import InvalidUsage

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

        # Ordering by given column and optionally given direction (default=descending)
        if order_by not in columns:
            raise InvalidUsage(f"Incorrect column name: '{str(order_by)}'. Check payload for viable column names",
                               status_code=422, payload={"columns": columns})
        else:
            ordering = f" ORDER BY cast({request.args.get('order_by')} as REAL)"
            if request.args.get('direction'):
                direction = request.args.get('direction')
                if direction in {"asc", "ascending", "ASC", "ASCENDING"}:
                    ordering += " ASC"
                elif direction in {"dsc", "desc", "descending", "DSC", "DESC", "DESCENDING"}:
                    ordering += " DESC"
                else:
                    directions = {"asc", "ascending", "ASC", "ASCENDING", "dsc", "desc", "descending", "DSC", "DESC",
                                  "DESCENDING"}
                    raise InvalidUsage(
                        f"Undefined direction: '{direction}'. Check payload for viable directions",
                        status_code=422, payload={"directions": directions})
            else:  # Default option
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

    linked_artists = list(map(db.LinkedArtist.from_db_row, rows))

    if request.content_type in {"application/json", None}:
        return jsonify(linked_artists)
    elif request.content_type == "text/csv":
        return create_csv_response(db.LinkedArtist, linked_artists)


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

    linked_artists = list(map(db.LinkedArtist.from_db_row, rows))

    if request.content_type in {"application/json", None}:
        return jsonify(linked_artists)
    elif request.content_type == "text/csv":
        return create_csv_response(db.LinkedArtist, linked_artists)


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

    linked_songs = list(map(db.LinkedSong.from_db_row, rows))

    if request.content_type in {"application/json", None}:
        return jsonify(linked_songs)
    elif request.content_type == "text/csv":
        return create_csv_response(db.LinkedSong, linked_songs)


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
        try:
            year = int(request.args.get('year'))
        except ValueError:
            raise InvalidUsage(f"Value for paremeter 'year' is not an integer: '{request.args.get('year')}'",
                               status_code=422)
        filters.append(f"song_year = '{request.args.get('year')}'")
    if request.args.get('artist_id'):
        filters.append(f"artist_id = '{request.args.get('artist_id')}'")

    if request.args.get('order_by'):
        order_by = request.args.get('order_by')

        # Make sure column is part of table
        cursor.execute("SELECT * FROM music LIMIT 1")
        columns = [desc[0] for desc in cursor.description]

        # Ordering by given column and optionally given direction (default=descending)
        if order_by not in columns:
            raise InvalidUsage(f"Incorrect column name: '{str(order_by)}'. Check payload for viable column names",
                               status_code=422, payload={"columns": columns})
        else:
            ordering = f" ORDER BY cast({request.args.get('order_by')} as REAL)"
            if request.args.get('direction'):
                direction = request.args.get('direction')
                if direction in {"asc", "ascending", "ASC", "ASCENDING"}:
                    ordering += " ASC"
                elif direction in {"dsc", "desc", "descending", "DSC", "DESC", "DESCENDING"}:
                    ordering += " DESC"
                else:
                    directions = {"asc", "ascending", "ASC", "ASCENDING", "dsc", "desc", "descending", "DSC", "DESC",
                                  "DESCENDING"}
                    raise InvalidUsage(
                        f"Undefined direction: '{direction}'. Check payload for viable directions",
                        status_code=422, payload={"directions": directions})
            else:  # Default option
                ordering += " DESC"
            options.append(ordering)

    if request.args.get('count'):
        options.append(f" LIMIT {request.args.get('count')}")

    filters_string = " AND ".join(filters)
    if filters_string != "":
        query = " WHERE ".join([query, filters_string])

    query += " ".join(options)

    print(query)
    cursor.execute(query)
    rows = cursor.fetchall()

    # TODO Add links to releases/songs
    linked_songs = list(map(db.LinkedSong.from_db_row, rows))

    if request.content_type in {"application/json", None}:
        return jsonify(linked_songs)
    elif request.content_type == "text/csv":
        return create_csv_response(db.LinkedSong, linked_songs)


@app.route('/songs/<string:song_id>', methods=["GET"])
def show_song(song_id):
    conn = db.get_connection()
    cursor = conn.cursor()

    query = f"SELECT * FROM music WHERE song_id = '{song_id}'"
    cursor.execute(query)
    rows = cursor.fetchall()

    songs = list(map(db.LinkedSong.from_db_row, rows))

    if request.content_type in {"application/json", None}:
        return jsonify(songs)
    elif request.content_type == "text/csv":
        return create_csv_response(db.LinkedSong, songs)


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


# Start song collection with supplied set of songs
@app.route('/songs', methods=["POST"])
def create_songs():
    conn = db.get_connection()
    cursor = conn.cursor()

    # For checking if database is empty
    query = f"SELECT * FROM music"
    cursor.execute(query)
    row = cursor.fetchone()
    if row is not None:
        # Database is not empty
        raise InvalidUsage(f"Resource already exists. Try \"PUT\" or \"DELETE\"", status_code=409)

    # Verify payload
    try:
        payload_json = request.json
    except:
        raise InvalidUsage(f"Payload is not a valid json", status_code=409)

    try:
        song_list = list(map(db.Song.from_json_dict, payload_json))
    except:
        raise InvalidUsage(f"JSON can not be converted into valid song data. See payload for required columns", status_code=409, payload={"columns": dataclasses.fields(db.Song)})

    # Database is empty, so can insert without checking for song_id collisions
    db.add_songs(song_list)

    return "Created collection at /songs", 201


# Update song collection with supplied set of songs, overwriting existing rows where the song_id column collides
@app.route('/songs', methods=["PUT"])
def update_songs():
    conn = db.get_connection()
    cursor = conn.cursor()

    # For checking if database is empty
    query = f"SELECT * FROM music"
    cursor.execute(query)
    row = cursor.fetchone()
    if row is None:
        # Database is empty
        raise InvalidUsage(f"Resource does not exists. Try \"CREATE\" instead", status_code=409)

    # Verify payload
    try:
        payload_json = request.json
    except:
        raise InvalidUsage(f"Payload is not a valid json", status_code=409)

    try:
        song_list = list(map(db.Song.from_json_dict, payload_json))
    except:
        raise InvalidUsage(f"JSON can not be converted into valid song data. See payload for required columns", status_code=409, payload={"columns": dataclasses.fields(db.Song)})

    # Bulk update songs (update existing and add new ones)
    db.put_songs(song_list)



# Ignoring some safety concerns
# from https://stackoverflow.com/a/42286498
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


# from https://flask.palletsprojects.com/en/1.1.x/patterns/apierrors/
@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


if __name__ == '__main__':
    app.run()
