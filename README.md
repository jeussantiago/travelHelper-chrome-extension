# travelHelper-chrome-extension

Google Flights is easy to use and convenient since users can easily search for flights rather than entering a different domain then once again search for flights. It eliminates that annoying one step. However, Google Flights often fails in providing the best price. Many of times, it failed to find connecting flights which would make last minute trips cheaper. Similarly, it would find the exact same flight as other sites, but label them at a higher price, somewhere around 5% to 15%.

Trvel Helper looks to take advantage of the easiness of Google Flights and the ability of the more powerful sites such as skyscanner in order to provide users with the lowest price possible for their next destination.

## Data Format

```
flight_data = {
    'cities' : array(str)
    'dates' : array(str : 'year-month-day')
    'seat_type' : str,
    'adult_count' : str(number)
    'child_count' : str(number)
    'stops_count' : str(number) if specified, else null
}
```

> Round Trip Example

```
{
    'cities' : ["JFK", "NRT"]
    'dates' : ["2023-09-17", "2023-10-03"]
    'seat_type' : "premium economy",
    'adult_count' : "2"
    'child_count' : "3"
    'stops_count' : "0"
}
```

> Multi Way Example

```
{
    'cities' : ["JFK", "HND", "HND", "KIX", "KIX", "JFK"]
    'dates' : ["2023-09-17", "2023-09-21", "2023-09-25"]
    'seat_type' : "premium economy",
    'adult_count' : "2"
    'child_count' : "0"
    'stops_count' : null
}
```

> One Way Example

```
{
    'cities' : ["JFK", "HND"]
    'dates' : ['2023-09-17']
    'seat_type' : "premium economy",
    'adult_count' : "5"
    'child_count' : "0"
    'stops_count' : 1
}
```

---

### TO DO:

-   [x] scrape data
-   [x] add error handling for scraping data
-   [x] add error message to front if cant get data
-   [x] format data to fit conditions above
-   [x] remove console error message when an error appears from gathering data
-   [x] add booking.com
-   [ ] add momondo
-   [ ] add png/image for popout

### BUGS:

ISSUE 1. <br />

> if you start at google flights and then go to a different google tab like google explore, the popup still exists. Found a roundabout solution where I added a close button. Even if its closed in google/explore, if you open google/flights the app will open once again. This creates a different issue where the data isn't being gathered properly when the tab is switched back to google flights/. Possible data gathering issues include not being to able scrap and the data gathered is persistent from the previous time in google flights.
> Works as expected if enter google flights first and stays on the same page.

---

### John Logs:

7/24 - JD 1. COMPLETE When user clicks 'Compare' pull all data from input fields (googleFlightContentScript line 55) 2. IN PROGRESS Convert data in array into appropriate URL format 1. Kayak
kayak.com/flights/'origin abbreviation(NYC)'-'destination abbreviation(PAR)'
a. tripType:
i. if two dates are provided in the URL, Kayak assumes roundtrip
ii. if one date is provided, Kayak

issues:

1. breaks because of where it's located. Since the the data gathering is done inside of a click event, it should be seperated from the html - can think of it like seperating html and javascript.
   JD: let's go over this

2. when you get the number of passengers, you don't specify how many of each type of people. (Ex: Adults: 1, Child: 2, etc.) - Your format: 3 with no specifics
   JD: Fixed

3. origin and destination variables query the same class. Not sure what was intended here
   JD: Fixed. Changed selector to use the aria-labelledby attribute from each fields' input element

4. query doesn't account for multi city

5. didn't query oany of the sub filters like number of stops, the number of bags, etc.
    - although i'm not sure if i'd like to include these sub filters but i think
      the important ones like number of stops, number of bags, and departure and arrival times for each flights requested and important
