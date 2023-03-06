# Campaign CRUD App

React App to perform CRUD operations and managins campaigns

## Content

Implemented creating, editing and deleting existing campaigns.
As dabatase I used mockapi.io.

Creating campaign we have to provide campaign name, campaign keywords are created automatically based on typed name. Towns where campaign will be based are able to select from list. As funds I understad how much we have to pay for the campaign, and system checks if the campaign cost is not bigger than our bank account amount. If we provide number bigger than available amount on bank account, the error modal wil pop up. We also can deposit money to our bank account :)

Updating campaign takes as init value values of existing campaign. Fund bigger than on existing campaign also checks if we are able to pay extra the difference.
