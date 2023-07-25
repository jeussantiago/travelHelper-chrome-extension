# travelHelper-chrome-extension

## Data Format

> flight_data = {
>
> > 'cities' : array(str)
> > 'dates' : array(str : 'year-month-day')
> > 'seat_type' : str,
> > 'adult_count' : str(number)
> > 'child_count' : str(number)
> > 'stops_count' : str(number) if specified, else null
> > }
>
> Example:
>
> round trip example
> {
>
> > 'cities' : ["JFK", "NRT"]
> > 'dates' : ["2023-09-17", "2023-10-03"]
> > 'seat_type' : "premium economy",
> > 'adult_count' : "2"
> > 'child_count' : "3"
> > 'stops_count' : "0"
> > }
>
> multi way example
> {
>
> > 'cities' : ["JFK", "HND", "HND", "KIX", "KIX", "JFK"]
> > 'dates' : ["2023-09-17", "2023-09-21", "2023-09-25"]
> > 'seat_type' : "premium economy",
> > 'adult_count' : "2"
> > 'child_count' : "0"
> > 'stops_count' : null
> > }

> one way example
> {
>
> > 'cities' : ["JFK", "HND"]
> > 'dates' : ['2023-09-17']
> > 'seat_type' : "premium economy",
> > 'adult_count' : "5"
> > 'child_count' : "0"
> > 'stops_count' : 1
> > }

---

7/25

-   added Kayak Url using dummy data
-   added Expedia Url using dummy data

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
