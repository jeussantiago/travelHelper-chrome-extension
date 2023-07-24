# travelHelper-chrome-extension


7/24 - JD
    1. COMPLETE When user clicks 'Compare' pull all data from input fields (googleFlightContentScript line 55)
    2. IN PROGRESS Convert data in array into appropriate URL format
        1. Kayak
        kayak.com/flights/'origin abbreviation(NYC)'-'destination abbreviation(PAR)'
            a. tripType: 
                i. if two dates are provided in the URL, Kayak assumes roundtrip
                ii. if one date is provided, Kayak 
