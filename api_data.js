define({ "api": [
  {
    "type": "post",
    "url": "/songs/",
    "title": "Create a new song",
    "name": "CreateSong",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.artist_mbtags",
            "description": "<p>Unknown field.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.artist_mbtags_count",
            "description": "<p>Number of tags for the artist on mbtags.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.bars_confidence",
            "description": "<p>Confidence value (between 0 and 1) associated with each bar.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.bars_start",
            "description": "<p>Average start time of each bar, measured in bars.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.beats_confidence",
            "description": "<p>Average confidence interval of the beats.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.beats_start",
            "description": "<p>Average start time of each beat, measured in beats.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.duration",
            "description": "<p>Duration of the track in seconds.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.end_of_fade_in",
            "description": "<p>Time of the end of the fade in, at the beginning of the song.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.hotttnesss",
            "description": "<p>A measure of the song's popularity, when downloaded (in December 2010). Measured on a scale of 0 to 1.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "song.id",
            "description": "<p>A uniquely identifying number for the song.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.key",
            "description": "<p>Estimation of the key the song is in. Keys can be from 0 to 11.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.key_confidence",
            "description": "<p>Confidence value (between 0 and 1) of the key estimation.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.loudness",
            "description": "<p>General loudness of the track</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "song.mode",
            "description": "<p>Estimation of the mode the song.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.mode_confidence",
            "description": "<p>Confidence value (between 0 and 1) of the mode estimation.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.start_of_fade_out",
            "description": "<p>Start time of the fade out, in seconds, at the end of the song.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.tatums_confidence",
            "description": "<p>Confidence value (between 0 and 1) associated with each tatum.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.tatums_start",
            "description": "<p>Average start time of each tatum, measured in tatums.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.tempo",
            "description": "<p>Tempo in BPM.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.time_signature",
            "description": "<p>Time signature of the song, i.e. usual number of beats per bar.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.time_signature_confidence",
            "description": "<p>Confidence of the time signature</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "song.title",
            "description": "<p>Name of the song.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "song.year",
            "description": "<p>Year when this song was released, according to musicbrainz.org.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "myapp/example.js",
    "groupTitle": "Admin"
  },
  {
    "type": "delete",
    "url": "/songs/:song_id",
    "title": "Delete a song",
    "name": "DeleteSong",
    "group": "Admin",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 202 Accepted",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "myapp/example.js",
    "groupTitle": "Admin"
  },
  {
    "type": "put",
    "url": "/songs/",
    "title": "Bulk update songs",
    "name": "UpdateSongs",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "song",
            "description": "<p>Array of song objects.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.artist_mbtags",
            "description": "<p>Unknown field.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.artist_mbtags_count",
            "description": "<p>Number of tags for the artist on mbtags.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.bars_confidence",
            "description": "<p>Confidence value (between 0 and 1) associated with each bar.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.bars_start",
            "description": "<p>Average start time of each bar, measured in bars.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.beats_confidence",
            "description": "<p>Average confidence interval of the beats.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.beats_start",
            "description": "<p>Average start time of each beat, measured in beats.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.duration",
            "description": "<p>Duration of the track in seconds.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.end_of_fade_in",
            "description": "<p>Time of the end of the fade in, at the beginning of the song.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.hotttnesss",
            "description": "<p>A measure of the song's popularity, when downloaded (in December 2010). Measured on a scale of 0 to 1.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "song.id",
            "description": "<p>A uniquely identifying number for the song.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.key",
            "description": "<p>Estimation of the key the song is in. Keys can be from 0 to 11.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.key_confidence",
            "description": "<p>Confidence value (between 0 and 1) of the key estimation.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.loudness",
            "description": "<p>General loudness of the track</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "song.mode",
            "description": "<p>Estimation of the mode the song.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.mode_confidence",
            "description": "<p>Confidence value (between 0 and 1) of the mode estimation.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.start_of_fade_out",
            "description": "<p>Start time of the fade out, in seconds, at the end of the song.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.tatums_confidence",
            "description": "<p>Confidence value (between 0 and 1) associated with each tatum.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.tatums_start",
            "description": "<p>Average start time of each tatum, measured in tatums.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.tempo",
            "description": "<p>Tempo in BPM.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.time_signature",
            "description": "<p>Time signature of the song, i.e. usual number of beats per bar.</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "song.time_signature_confidence",
            "description": "<p>Confidence of the time signature</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "song.title",
            "description": "<p>Name of the song.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "song.year",
            "description": "<p>Year when this song was released, according to musicbrainz.org.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 202 Accepted",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "myapp/example.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/artists/?name=\":name\"&genre=\":genre\"&order_by=\":ordering\"&amount=\":amount\"",
    "title": "",
    "name": "GetArtistsByName",
    "group": "User",
    "description": "<p>Returns all artists optionally filtered by name and/or genre.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "name",
            "optional": false,
            "field": "artist_name",
            "description": "<p>Name to filter artists by</p>"
          },
          {
            "group": "Parameter",
            "type": "genre",
            "optional": false,
            "field": "artist_genre",
            "description": "<p>Genre to filter artists by</p>"
          },
          {
            "group": "Parameter",
            "type": "order_by",
            "optional": false,
            "field": "artist_hotness",
            "description": "<p>Ordering to sort results by</p>"
          },
          {
            "group": "Parameter",
            "type": "amount",
            "optional": false,
            "field": "Integer",
            "description": "<p>Maximum amount of artist ID's returned</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "artist",
            "description": "<p>Array of artists object.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "artist.name",
            "description": "<p>Name of the artist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "artist.familiarity",
            "description": "<p>A measure of 0..1 for how familiar the artist is to listeners.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "artist.hotttnesss",
            "description": "<p>A measure of the artists's popularity, when downloaded (in December 2010). Measured on a scale of 0 to 1.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "artist.id",
            "description": "<p>A unique ID for this artist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "artist.latitude",
            "description": "<p>The home location's latitude of this artist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "artist.location",
            "description": "<p>Integer\tUnknown.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "artist.longitude",
            "description": "<p>Float\tThe home location's longitude of this artist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "artist.similar",
            "description": "<p>Unknown.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "artist.terms",
            "description": "<p>The term most associated with this artist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "artist.terms_freq",
            "description": "<p>The frequency of this term.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n [\n   {\n        \"artist.familiarity\": 0.581793766,\n        \"artist.hotttnesss\": 0.401997543,\n        \"artist.id\": \"ARD7TVE1187B99BFB1\",\n         \"artist.latitude\": 0,\n         \"artist.location\": 0,\n         \"artist.longitude\": 0,\n         \"artist.name\": \"Casual\",\n         \"artist.similar\": 0,\n         \"artist.terms\": \"hip hop\",\n         \"artist.terms_freq\": 1\n          }\n\n         ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "myapp/example.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/artists/:artist_id/statistics/?year=\":year\"",
    "title": "",
    "name": "GetArtistsStatistics",
    "group": "User",
    "description": "<p>Descriptive statistics (mean, median, standard deviation) for the popularity of the songs by a particular artist with an optional filter by year.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "artist_id",
            "optional": false,
            "field": "artist_id",
            "description": "<p>ID of the artist</p>"
          },
          {
            "group": "Parameter",
            "type": "year",
            "optional": false,
            "field": "Integer",
            "description": "<p>(Optional) Year to calculate statistics about</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "mean",
            "description": "<p>Mean for the popularity of the songs</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "median",
            "description": "<p>Median for the popularity of the songs</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "std",
            "description": "<p>Standard deviation for the popularity of the songs</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n [\n     {\n     \"mean\" : 0.214141,\n     \"median\" : 0.15151,\n     \"stdev\" : 0.06131\n     }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "myapp/example.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/songs/?artist_id=\":artist.id\"&in_year=\":year\"&in_artist_genre=\"artist.genre\"&order_by\"song.hotness\"&amount=\":amount\"",
    "title": "",
    "name": "GetSongsByArtistOrYear",
    "group": "User",
    "description": "<p>Returns an array of songs' id by a specific artist and/or in specific year or in a specific genre.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "artist_id",
            "optional": false,
            "field": "artist_id",
            "description": "<p>Filter songs by artists</p>"
          },
          {
            "group": "Parameter",
            "type": "year",
            "optional": false,
            "field": "song_year",
            "description": "<p>Filter songs by release year</p>"
          },
          {
            "group": "Parameter",
            "type": "genre",
            "optional": false,
            "field": "artist_genre",
            "description": "<p>Filter songs by genre</p>"
          },
          {
            "group": "Parameter",
            "type": "order_by",
            "optional": false,
            "field": "song_hotness",
            "description": "<p>Ordering songs by hotness</p>"
          },
          {
            "group": "Parameter",
            "type": "amount",
            "optional": false,
            "field": "Integer",
            "description": "<p>Maximum number of songs returned</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "Songs",
            "description": "<p>Array of song IDs.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n [\n     {\n     \"song.id\" : SOMZWCG12A8C13C480\n     }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "myapp/example.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/songs/?song_id=\":song_id\"",
    "title": "",
    "name": "GetSongsById",
    "group": "User",
    "description": "<p>Returns all available information about a specific song identified by its unique dataset ID.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "song_id",
            "optional": false,
            "field": "Optional",
            "description": "<p>song.id to filter songs by</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "song",
            "description": "<p>Song object.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "song.artist_mbtags",
            "description": "<p>Unknown field.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "song.artist_mbtags_count",
            "description": "<p>Number of tags for the artist on mbtags.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "song.bars_confidence",
            "description": "<p>Confidence value (between 0 and 1) associated with each bar.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "song.bars_start",
            "description": "<p>Average start time of each bar, measured in bars.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "song.beats_confidence",
            "description": "<p>Average confidence interval of the beats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "song.beats_start",
            "description": "<p>Average start time of each beat, measured in beats.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "song.duration",
            "description": "<p>Duration of the track in seconds.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "song.end_of_fade_in",
            "description": "<p>Time of the end of the fade in, at the beginning of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "song.hotttnesss",
            "description": "<p>A measure of the song's popularity, when downloaded (in December 2010). Measured on a scale of 0 to 1.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "song.id",
            "description": "<p>A uniquely identifying number for the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "song.key",
            "description": "<p>Estimation of the key the song is in. Keys can be from 0 to 11.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "song.key_confidence",
            "description": "<p>Confidence value (between 0 and 1) of the key estimation.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "song.loudness",
            "description": "<p>General loudness of the track</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "song.mode",
            "description": "<p>Estimation of the mode the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "song.mode_confidence",
            "description": "<p>Confidence value (between 0 and 1) of the mode estimation.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "song.start_of_fade_out",
            "description": "<p>Start time of the fade out, in seconds, at the end of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "song.tatums_confidence",
            "description": "<p>Confidence value (between 0 and 1) associated with each tatum.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "song.tatums_start",
            "description": "<p>Average start time of each tatum, measured in tatums.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "song.tempo",
            "description": "<p>Tempo in BPM.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "song.time_signature",
            "description": "<p>Time signature of the song, i.e. usual number of beats per bar.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "song.time_signature_confidence",
            "description": "<p>Confidence of the time signature</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "song.title",
            "description": "<p>Name of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "song.year",
            "description": "<p>Year when this song was released, according to musicbrainz.org.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n [\n     {\"song.artist_mbtags\" : 0,\n     \"song.artist_mbtags_count\" : 0,\n     \"song.bars_confidence\" : 0.643,\n     \"song.bars_start\" : 0.58521,\n     \"song.beats_confidence\" : 0.834,\n     \"song.beats_start\" : 0.58521,\n     \"song.duration\" : 218.93179,\n     \"song.end_of_fade_in\" : 0.247,\n     \"song.hotttnesss\" : 0.60211999,\n     \"song.id\" : SOMZWCG12A8C13C480,\n     \"song.key\": 1,\"song.key_confidence\": 0.736,\n     \"song.loudness\": -11.197,\n     \"song.mode\": 0,\n     \"song.mode_confidence\": 0.636,\n     \"song.start_of_fade_out\": 218.932,\n     \"song.tatums_confidence\": 0.779,\n     \"song.tatums_start\": 0.28519,\n     \"song.tempo\": 92.198,\n     \"song.time_signature\": 4,\n     \"song.time_signature_confidence\": 0.778\n     \"song.title\": 0,\n     \"song.year\": 0 }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "myapp/example.js",
    "groupTitle": "User"
  }
] });
