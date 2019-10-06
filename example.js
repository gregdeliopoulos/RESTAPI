
/**
 * @api {get} /artists/?name=":name"&genre=":genre"&order_by=":ordering"&amount=":amount"
 * @apiName GetArtistsByName
 * @apiGroup User
 * @apiDescription Returns all artists optionally filtered by name and/or genre.
 *
 * @apiParam {name} artist_name Name to filter artists by
 * @apiParam {genre} artist_genre Genre to filter artists by
 * @apiParam {order_by} artist_hotness Ordering to sort results by
 * @apiParam {amount} Integer Maximum amount of artist ID's returned
 *
 * @apiSuccess {Object[]} artist Array of artists object.
 * @apiSuccess {String} artist.name Name of the artist.
 * @apiSuccess {Float} artist.familiarity A measure of 0..1 for how familiar the artist is to listeners.
 * @apiSuccess {Float} artist.hotttnesss	A measure of the artists's popularity, when downloaded (in December 2010). Measured on a scale of 0 to 1.
 * @apiSuccess {String} artist.id A unique ID for this artist.
 * @apiSuccess {Float} artist.latitude	The home location's latitude of this artist.
 * @apiSuccess {Integer} artist.location Integer	Unknown.
 * @apiSuccess {Float} artist.longitude	Float	The home location's longitude of this artist.
 * @apiSuccess {String} artist.name	The name of the artist.
 * @apiSuccess {Float} artist.similar	Unknown.
 * @apiSuccess {String} artist.terms	The term most associated with this artist.
 * @apiSuccess {Float} artist.terms_freq	The frequency of this term.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      [
 *        {
 *             "artist.familiarity": 0.581793766,
 *             "artist.hotttnesss": 0.401997543,
 *             "artist.id": "ARD7TVE1187B99BFB1",
 *              "artist.latitude": 0,
 *              "artist.location": 0,
 *              "artist.longitude": 0,
 *              "artist.name": "Casual",
 *              "artist.similar": 0,
 *              "artist.terms": "hip hop",
 *              "artist.terms_freq": 1
 *               }
 *
 *              ]
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

/**
 * @api {get} /songs/?song_id=":song_id"
 * @apiName GetSongsById
 * @apiGroup User
 * @apiDescription Returns all available information about a specific song identified by its unique dataset ID.
 *
 * @apiParam {song_id} Optional song.id to filter songs by
 *
 * @apiSuccess {Object} song Song object.
 * @apiSuccess {Float} song.artist_mbtags	Unknown field.
 * @apiSuccess {Float} song.artist_mbtags_count	Number of tags for the artist on mbtags.
 * @apiSuccess {Float} song.bars_confidence	Confidence value (between 0 and 1) associated with each bar.
 * @apiSuccess {Float} song.bars_start	Average start time of each bar, measured in bars.
 * @apiSuccess {Float} song.beats_confidence	Average confidence interval of the beats.
 * @apiSuccess {Float} song.beats_start	Average start time of each beat, measured in beats.
 * @apiSuccess {Float} song.duration	Duration of the track in seconds.
 * @apiSuccess {Float} song.end_of_fade_in	Time of the end of the fade in, at the beginning of the song.
 * @apiSuccess {Float} song.hotttnesss	A measure of the song's popularity, when downloaded (in December 2010). Measured on a scale of 0 to 1.
 * @apiSuccess  {String} song.id	A uniquely identifying number for the song.
 * @apiSuccess  {Float} song.key	Estimation of the key the song is in. Keys can be from 0 to 11.
 * @apiSuccess {Float} song.key_confidence	Confidence value (between 0 and 1) of the key estimation.
 * @apiSuccess  {Float} song.loudness General loudness of the track
 * @apiSuccess {Integer} song.mode	Estimation of the mode the song.
 * @apiSuccess {Float} song.mode_confidence	Confidence value (between 0 and 1) of the mode estimation.
 * @apiSuccess {Float} song.start_of_fade_out	Start time of the fade out, in seconds, at the end of the song.
 * @apiSuccess  {Float} song.tatums_confidence	Confidence value (between 0 and 1) associated with each tatum.
 * @apiSuccess {Float} song.tatums_start	Average start time of each tatum, measured in tatums.
 * @apiSuccess {Float} song.tempo	Tempo in BPM.
 * @apiSuccess {Float} song.time_signature	Time signature of the song, i.e. usual number of beats per bar.
 * @apiSuccess {Float}  song.time_signature_confidence	Confidence of the time signature
 * @apiSuccess {Integer} song.title	Name of the song.
 * @apiSuccess  {Integer} song.year	Year when this song was released, according to musicbrainz.org.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      [
 *          {"song.artist_mbtags" : 0,
 *          "song.artist_mbtags_count" : 0,
 *          "song.bars_confidence" : 0.643,
 *          "song.bars_start" : 0.58521,
 *          "song.beats_confidence" : 0.834,
 *          "song.beats_start" : 0.58521,
 *          "song.duration" : 218.93179,
 *          "song.end_of_fade_in" : 0.247,
 *          "song.hotttnesss" : 0.60211999,
 *          "song.id" : SOMZWCG12A8C13C480,
 *          "song.key": 1,"song.key_confidence": 0.736,
 *          "song.loudness": -11.197,
 *          "song.mode": 0,
 *          "song.mode_confidence": 0.636,
 *          "song.start_of_fade_out": 218.932,
 *          "song.tatums_confidence": 0.779,
 *          "song.tatums_start": 0.28519,
 *          "song.tempo": 92.198,
 *          "song.time_signature": 4,
 *          "song.time_signature_confidence": 0.778
 *          "song.title": 0,
 *          "song.year": 0 }
 *       ]
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */



/**
 * @api {get} /songs/?artist_id=":artist.id"&in_year=":year"&in_artist_genre="artist.genre"&order_by"song.hotness"&amount=":amount"
 * @apiName GetSongsByArtistOrYear
 * @apiGroup User
 * @apiDescription Returns an array of songs' id by a specific artist and/or in specific year or in a specific genre.
 *
 * @apiParam {artist_id} artist_id Filter songs by artists
 * @apiParam {year} song_year Filter songs by release year
 * @apiParam {genre} artist_genre Filter songs by genre
 * @apiParam {order_by} song_hotness Ordering songs by hotness
 * @apiParam {amount} Integer Maximum number of songs returned
 *
 * @apiSuccess {String[]} Songs Array of song IDs.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      [
 *          {
 *          "song.id" : SOMZWCG12A8C13C480
 *          }
 *       ]
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

/**
 * @api {get} /artists/:artist_id/statistics/?year=":year"
 * @apiName GetArtistsStatistics
 * @apiGroup User
 * @apiDescription Descriptive statistics (mean, median, standard deviation) for the popularity of the songs by a particular artist with an optional filter by year.
 *
 * @apiParam {artist_id} artist_id ID of the artist
 * @apiParam {year} Integer (Optional) Year to calculate statistics about
 *
 * @apiSuccess {Float} mean Mean for the popularity of the songs
 * @apiSuccess {Float} median Median for the popularity of the songs
 * @apiSuccess {Float} std Standard deviation for the popularity of the songs

 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      [
 *          {
 *          "mean" : 0.214141,
 *          "median" : 0.15151,
 *          "stdev" : 0.06131
 *          }
 *       ]
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

/**
 * @api {post} /songs/ Create a new song
 * @apiName CreateSong
 * @apiGroup Admin
 *
 * @apiParam {Float} song.artist_mbtags	Unknown field.
 * @apiParam {Float} song.artist_mbtags_count	Number of tags for the artist on mbtags.
 * @apiParam {Float} song.bars_confidence	Confidence value (between 0 and 1) associated with each bar.
 * @apiParam {Float} song.bars_start	Average start time of each bar, measured in bars.
 * @apiParam {Float} song.beats_confidence	Average confidence interval of the beats.
 * @apiParam {Float} song.beats_start	Average start time of each beat, measured in beats.
 * @apiParam {Float} song.duration	Duration of the track in seconds.
 * @apiParam {Float} song.end_of_fade_in	Time of the end of the fade in, at the beginning of the song.
 * @apiParam {Float} song.hotttnesss	A measure of the song's popularity, when downloaded (in December 2010). Measured on a scale of 0 to 1.
 * @apiParam  {String} song.id	A uniquely identifying number for the song.
 * @apiParam  {Float} song.key	Estimation of the key the song is in. Keys can be from 0 to 11.
 * @apiParam {Float} song.key_confidence	Confidence value (between 0 and 1) of the key estimation.
 * @apiParam  {Float} song.loudness General loudness of the track
 * @apiParam {Integer} song.mode	Estimation of the mode the song.
 * @apiParam {Float} song.mode_confidence	Confidence value (between 0 and 1) of the mode estimation.
 * @apiParam {Float} song.start_of_fade_out	Start time of the fade out, in seconds, at the end of the song.
 * @apiParam  {Float} song.tatums_confidence	Confidence value (between 0 and 1) associated with each tatum.
 * @apiParam {Float} song.tatums_start	Average start time of each tatum, measured in tatums.
 * @apiParam {Float} song.tempo	Tempo in BPM.
 * @apiParam {Float} song.time_signature	Time signature of the song, i.e. usual number of beats per bar.
 * @apiParam {Float}  song.time_signature_confidence	Confidence of the time signature
 * @apiParam {Integer} song.title	Name of the song.
 * @apiParam  {Integer} song.year	Year when this song was released, according to musicbrainz.org.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *
 */

/**
 * @api {put} /songs/ Bulk update songs
 * @apiName UpdateSongs
 * @apiGroup Admin
 *
 * @apiParam {Object[]} song Array of song objects.
 * @apiParam {Float} song.artist_mbtags	Unknown field.
 * @apiParam {Float} song.artist_mbtags_count	Number of tags for the artist on mbtags.
 * @apiParam {Float} song.bars_confidence	Confidence value (between 0 and 1) associated with each bar.
 * @apiParam {Float} song.bars_start	Average start time of each bar, measured in bars.
 * @apiParam {Float} song.beats_confidence	Average confidence interval of the beats.
 * @apiParam {Float} song.beats_start	Average start time of each beat, measured in beats.
 * @apiParam {Float} song.duration	Duration of the track in seconds.
 * @apiParam {Float} song.end_of_fade_in	Time of the end of the fade in, at the beginning of the song.
 * @apiParam {Float} song.hotttnesss	A measure of the song's popularity, when downloaded (in December 2010). Measured on a scale of 0 to 1.
 * @apiParam  {String} song.id	A uniquely identifying number for the song.
 * @apiParam  {Float} song.key	Estimation of the key the song is in. Keys can be from 0 to 11.
 * @apiParam {Float} song.key_confidence	Confidence value (between 0 and 1) of the key estimation.
 * @apiParam  {Float} song.loudness General loudness of the track
 * @apiParam {Integer} song.mode	Estimation of the mode the song.
 * @apiParam {Float} song.mode_confidence	Confidence value (between 0 and 1) of the mode estimation.
 * @apiParam {Float} song.start_of_fade_out	Start time of the fade out, in seconds, at the end of the song.
 * @apiParam  {Float} song.tatums_confidence	Confidence value (between 0 and 1) associated with each tatum.
 * @apiParam {Float} song.tatums_start	Average start time of each tatum, measured in tatums.
 * @apiParam {Float} song.tempo	Tempo in BPM.
 * @apiParam {Float} song.time_signature	Time signature of the song, i.e. usual number of beats per bar.
 * @apiParam {Float}  song.time_signature_confidence	Confidence of the time signature
 * @apiParam {Integer} song.title	Name of the song.
 * @apiParam  {Integer} song.year	Year when this song was released, according to musicbrainz.org.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 202 Accepted
 *
 */

/**
 * @api {delete} /songs/:song_id Delete a song
 * @apiName DeleteSong
 * @apiGroup Admin
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 202 Accepted
 *
 */