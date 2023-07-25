# travelHelper-chrome-extension

7/24 - JD 1. COMPLETE When user clicks 'Compare' pull all data from input fields (googleFlightContentScript line 55) 2. IN PROGRESS Convert data in array into appropriate URL format 1. Kayak
kayak.com/flights/'origin abbreviation(NYC)'-'destination abbreviation(PAR)'
a. tripType:
i. if two dates are provided in the URL, Kayak assumes roundtrip
ii. if one date is provided, Kayak

issues:

1. breaks because of where it's located. Since the the data gathering is done inside of a click event, it should be seperated from the html - can think of it like seperating html and javascript.

2. when you get the number of passengers, you don't specify how many of each type of people. (Ex: Adults: 1, Child: 2, etc.)

    - Your format: 3 with no specifics

3. origin and destination variables query the same class. Not sure what was intended here

4. query doesn't account for multi city

5. didn't query oany of the sub filters like number of stops, the number of bags, etc.
    - although i'm not sure if i'd like to include these sub filters but i think
      the important ones like number of stops, number of bags, and departure and arrival times for each flights requested and important
