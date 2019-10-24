import dataclasses
import sqlite3
from dataclasses import dataclass

from flask import json


@dataclass
class Artist:
    familiarity: float
    hotttnesss: float
    id: str
    latitude: float
    location: int
    longitude: float
    name: str
    similar: float
    terms: str
    terms_freq: float

    @classmethod
    def from_db_row(cls, row: str) -> 'Artist':
        return cls(*row[0:10])

    def __iter__(self):
        return iter(
            [self.familiarity,
             self.hotttnesss,
             self.id,
             self.latitude,
             self.location,
             self.longitude,
             self.name,
             self.similar,
             self.terms,
             self.terms_freq])


@dataclass
class LinkedArtist(Artist):
    links: dict

    @classmethod
    def from_artist(cls, artist) -> 'LinkedArtist':
        links = cls.create_artist_links(artist)

        return cls(*tuple(artist), links)

    @classmethod
    def from_db_row(cls, row) -> 'LinkedArtist':
        artist = Artist.from_db_row(row)
        links = cls.create_artist_links(artist)

        return cls(*tuple(artist), links)

    @classmethod
    def create_artist_links(cls, artist):
        links = {}
        links["self"] = {}
        links["self"]["description"] = "View " + artist.name
        links["self"]["href"] = "/artists/" + artist.id
        links["self"]["method"] = "GET"

        links["songs"] = {}
        links["songs"]["description"] = "Songs"
        links["songs"]["href"] = "/artists/" + artist.id + "/songs"
        links["songs"]["method"] = "GET"

        links["releases"] = {}
        links["releases"]["description"] = "Releases"
        links["releases"]["href"] = "/artists/" + artist.id + "/releases"
        links["releases"]["method"] = "GET"

        links["delete"] = {}
        links["delete"]["description"] = "Delete this Artist"
        links["delete"]["href"] = "/artists/" + artist.id
        links["delete"]["method"] = "DELETE"

        return links


# Has uplink to artist_id
@dataclass
class Release:
    artist_id: str
    id: int
    name: int

    @classmethod
    def from_db_row(cls, row: str) -> 'Release':
        args = list([row[2]]) + list(row[10:12])
        return cls(*args)

    def __iter__(self):
        return iter([self.id, self.name])


# Has uplink to artist_id and release_id
@dataclass
class Song:
    artist_id: str
    artist_name: str
    release_id: str
    artist_mbtags: float
    artist_mbtags_count: float
    bars_confidence: float
    bars_start: float
    beats_confidence: float
    beats_start: float
    duration: float
    end_of_fade_in: float
    hotttnesss: float
    id: str
    key: float
    key_confidence: float
    loudness: float
    mode: int
    mode_confidence: float
    start_of_fade_out: float
    tatums_confidence: float
    tatums_start: float
    tempo: float
    time_signature: float
    time_signature_confidence: float
    title: int
    year: int

    @classmethod
    def from_db_row(cls, row: str) -> 'Song':
        args = list([row[2]] + [row[6]] + [row[10]]) + list(row[12:35])
        return cls(*args)

    @classmethod
    def from_json_dict(cls, dict: str) -> 'Song':
        return cls(**dict)

    def __iter__(self):
        return iter([self.artist_id,
                     self.artist_name,
                     self.release_id,
                     self.artist_mbtags,
                     self.artist_mbtags_count,
                     self.bars_confidence,
                     self.bars_start,
                     self.beats_confidence,
                     self.beats_start,
                     self.duration,
                     self.end_of_fade_in,
                     self.hotttnesss,
                     self.id,
                     self.key,
                     self.key_confidence,
                     self.loudness,
                     self.mode,
                     self.mode_confidence,
                     self.start_of_fade_out,
                     self.tatums_confidence,
                     self.tatums_start,
                     self.tempo,
                     self.time_signature,
                     self.time_signature_confidence,
                     self.title,
                     self.year])


@dataclass
class LinkedSong(Song):
    links: dict

    @classmethod
    def from_song(cls, song) -> 'LinkedSong':
        links = cls.create_song_links(song)

        return cls(*song, links)

    @classmethod
    def from_db_row(cls, row) -> 'LinkedSong':
        song = Song.from_db_row(row)
        links = cls.create_song_links(song)

        return cls(*song, links)

    @classmethod
    def create_song_links(cls, song):
        links = {}
        links["self"] = {}
        links["self"]["description"] = "View " + str(song.title)
        links["self"]["href"] = "/songs/" + song.id
        links["self"]["method"] = "GET"

        links["artist"] = {}
        links["artist"]["description"] = "By " + song.artist_name
        links["artist"]["href"] = "/artists/" + song.artist_id
        links["artist"]["method"] = "GET"

        links["releases"] = {}
        links["releases"]["description"] = "Releases"
        links["releases"]["href"] = "/artists/" + song.artist_id + "/releases"
        links["releases"]["method"] = "GET"

        return links


# @dataclass
# class SongObject:
#     artist: Artist
#     release: Release
#     song: Song
#
#     @classmethod
#     def from_db_row(cls, row: str) -> 'SongObject':
#         artist = Artist(*row[0:10])
#         release = Release(*row[10:12])
#         song = Song(*row[12:35])
#         return cls(artist, release, song)


@dataclass
class SongRow:
    artist_familiarity: float
    artist_hotttnesss: float
    artist_id: str
    artist_latitude: float
    artist_location: int
    artist_longitude: float
    artist_name: str
    artist_similar: float
    artist_terms: str
    artist_terms_freq: float
    release_id: int
    release_name: int
    song_artist_mbtags: float
    song_artist_mbtags_count: float
    song_bars_confidence: float
    song_bars_start: float
    song_beats_confidence: float
    song_beats_start: float
    song_duration: float
    song_end_of_fade_in: float
    song_hotttnesss: float
    song_id: str
    song_key: float
    song_key_confidence: float
    song_loudness: float
    song_mode: int
    song_mode_confidence: float
    song_start_of_fade_out: float
    song_tatums_confidence: float
    song_tatums_start: float
    song_tempo: float
    song_time_signature: float
    song_time_signature_confidence: float
    song_title: int
    song_year: int

    @classmethod
    def from_db_row(cls, row: str) -> 'SongRow':
        return cls(*row)


def get_connection():
    return sqlite3.connect('music_data.db')


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


# TODO Should be general ADD_ROW, use keys to populate a SongRow instance, leave other fields empty, and then insert/update row
def add_songs(songs):
    conn = get_connection()
    cursor = conn.cursor()

    #Get field names
    field_names = [field.name for field in dataclasses.fields(Song)]

    #prepend field prefixes
    prefixed_names = []
    for field_name in field_names:
        if field_name not in ["artist_id", "artist_name", "release_id"]:
            prefixed_names.append("song_" + field_name)
        else:
            prefixed_names.append(field_name)
    # field_names = ["song_" + field_name for field_name in field_names if field_name not in {"artist_id", "artist_name", "release_id"}]

    query = f"INSERT INTO music(" + ",".join(prefixed_names) + ") VALUES(" + ",".join(["?" for _ in prefixed_names]) + ")"
    print(query)
    # cursor.executemany(query, songs)

    #lose unprefixed key names
    raw_song_values = list(map(tuple, songs))
    # cursor.execute(query, tuple(songs))
    cursor.executemany(query, raw_song_values)
    conn.commit()
    conn.close()


def is_in_database(song):
    conn = get_connection()
    cursor = conn.cursor()

    query = f"SELECT * FROM music WHERE song_id = '{song.id}'"
    cursor.execute(query)
    row = cursor.fetchone()

    return row is not None


# Will update songs that are already present in the database (based on song_id), and add ones that are not yet present
def put_songs(songs):
    existing_songs = [song for song in songs if is_in_database(song)]
    new_songs = [song for song in songs if not is_in_database(song)]


    conn = get_connection()
    cursor = conn.cursor()
    # Update by deleting rows and inserting new ones (This does require full new data for updating a song row, but that is expected when bulk updating songs)
    for song in existing_songs:
        query = f"DELETE FROM music where song_id = '{song.id}'"
        cursor.execute(query)
    conn.commit()
    conn.close()


    # Add all songs
    add_songs(existing_songs)
    add_songs(new_songs)



if __name__ == "__main__":
    conn = get_connection()

    conn.row_factory = dict_factory
    cursor = conn.cursor()
    # cursor.execute("DELETE FROM music")
    cursor.execute("SELECT * FROM music")
    # for idx, col in enumerate(cursor.description):
    #     print(idx, col)
    #
    for row in cursor.fetchall():
        print(json.dumps(row))
        # print(str(row))

    conn.commit()
    conn.close()
