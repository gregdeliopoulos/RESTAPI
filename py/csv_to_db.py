import sqlite3
import csv


class csvReader(object):
    def csvFile(self):
        self.readFile('music.csv')

    def readFile(self, filename):
        conn = sqlite3.connect('music_data.db')
        cur = conn.cursor()
        cur.execute(
            'CREATE TABLE IF NOT EXISTS music(\n'
            'artist_familiarity float,\n'
            'artist_hotttnesss float,\n'
            'artist_id text,\n'
            'artist_latitude float,\n'
            'artist_location int,\n'
            'artist_longitude float,\n'
            'artist_name text,\n'
            'artist_similar float,\n'
            'artist_terms text,\n'
            'artist_terms_freq float,\n'
            'release_id int,\n'
            'release_name int,\n'
            'song_artist_mbtags float,\n'
            'song_artist_mbtags_count float,\n'
            'song_bars_confidence float,\n'
            'song_bars_start float,\n'
            'song_beats_confidence float,\n'
            'song_beats_start float,\n'
            'song_duration float,\n'
            'song_end_of_fade_in float,\n'
            'song_hotttnesss float,\n'
            'song_id text,\n'
            'song_key float,\n'
            'song_key_confidence float,\n'
            'song_loudness float,\n'
            'song_mode int,\n'
            'song_mode_confidence float,\n'
            'song_start_of_fade_out float,\n'
            'song_tatums_confidence float,\n'
            'song_tatums_start float,\n'
            'song_tempo float,\n'
            'song_time_signature float,\n'
            'song_time_signature_confidence float,\n'
            'song_title int,\n'
            'song_year int)')
        filename.encode('utf-8')
        print("test1")
        with open(filename) as f:
            reader = csv.reader(f)
            next(reader, None)  # skip the headers
            for field in reader:
                cur.execute("INSERT INTO music VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", field)

        conn.commit()
        conn.close()


if __name__ == "__main__":
    csv_path = "/music.csv"
    c = csvReader().csvFile()