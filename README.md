# Roamie
A travel companion for exploring near and far!

# Description
Roamie accompanies users as they explore their home city or a city they're just visiting for the first time! She offers users options in digestible sets of three for activities or places to visit based on their preferences (budget, interests, favorite activities) and their location, and allows users to rate and describe their experiences through words and pictures in a trip diary that they can share with friends. As users visit a new place, Roamie will serve up new suggestions for what to do next, and a map visualization will show where the user has been so far and what they've done.

Roamie can remind a user of a beautiful day they spent in their hometown, or help tell the story of the spots they visited while adventuring away from home.

# Minimum Viable Product
_Tier 1: Choose Your Own Adventure_
  * Login for Existing Users
  * Signup for New Users
  * User Preferences:
    * When do you eat meals
    * Interest categories: Art, Food, Outdoors, Music, Alcohol, Coffee, Tea, Animals
  * Start a trip:
    * Pick a neighborhood or choose current location
    * Pick an activity: Art, Outside, Coffee, Eat, etc.
    * Serve options for first spot
  * Rate Your Spot
    * thumbs up/down
    * short free-form text input for describing experience
    * add photos to spot from iOs album
  * Continue trip
    * Pick next activity: Walk, Art, Food, outdoors, etc.
    * Roamie serves options for next
    * Map visualization reflects route as it builds
      * Default color scheme (based on time of day) colors in map with a cute CSS effect as the trip progresses
      * Customized markers (maybe thumbs up or thumbs down, or related to type of activity -- a coffee cup, a picture frame, trees, etc.)
  * End Trip
    * Creates a database instance that will serve up trip info to scrapbook component.
    * Consolidate photos, route map, and "journal entries" associated with the trip to generate a "scrapbook" REACT page.
    * Generate a shareable link to the scrapbook web page

    _Tier 2: Feature-based Adventures (OAuth)_
    * Map visualization
      * Map colors will draw from the photo captures in the area
    * External accounts
      * Connect with Instagram account to provide recommendations
      * Connect with Spotify account to provide reommendations

    _Tier 3: Socializing_
    * Multi-user trips
    * Lambdas for saving daily weather data
    
    
    
    
    
# How to run
Start local server
npm run start-server

Start React Native Application
npm run start

Press 'i' to run on XCode IOS simulator or scan QR barcode to launch on phone
