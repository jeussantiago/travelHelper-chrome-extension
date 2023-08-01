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
