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
-   [ ] add error message to front if cant get data
-   [ ] format data to fit conditions above
-   [ ] work on popup UI
-   [ ] add booking.com
-   [ ] add momondo
-   [ ] try to fix bug by changing const to var

### BUGS:

ISSUE 1. <br />

> will have the popup when you first open google flights or when its reload if the page already has it and you go to another tab like explore, b/c the page doesnt reload, the popup doesn't go away vice versa if you are on google explore where it doesn't show up then you enter google flights but the state hasnt changed

POSSIBLE SOLUTION:

-   add a chrome tabs onUpdated listener to check the current url
-   only show the tab if it complies with any of the sites approved

STEPS:

1. see if the user wants to open any other site
2. if none dont do anything otherwise get data from page
3. have a error condition where the data can't be retrieve
   show the user the error: tell them to try again
4. data retrieved successfully
   figure out some way to go to the given websites with filled in info

ISSUE 2. <br />

> other than cabin class, can't retrive data from page dynamically. This might be do to the variables being stored in const variables rather than vars, this means that they cant update once filled

Possible Solution:

-   update the 'const' variables on flights searching to 'var'

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
