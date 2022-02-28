# Pokedex

Pokedex :
The application is displaying the list of pokemon, with pagination and 20 pokemons by pages.
You can add/remove a pokemon to your catch list and then display it by clicking: show catch list button.
You can clear the catch list byt clicking the Clear catch list button.

You can see the details (Show basic stats and list of moves) of a specific pokemon by clicking on show details.

Comments:
Unfortunately I was short in time this weekend (due to last minute personal issue) to implements everything, so I focused on relevant parts
(Missing: Search function and Wishlist)
I also focused on the unit tests on poke-list component and pokedex service and hadn't the time to implement tests for other components,
but I tried to cover different types of tests (template, functions, local storage), that would have been the same the for other components.

I'm managing observables both using the | async pipe, and subscribing/unsubscribing on the component directly. I don't really mind using
one or the other as long as it is unsubscribed properly.

I'm using the onPush change detection as this is useful to speed up applications (even if this can be tedious to manage change detection manually,
and this application is small)

I have implemented the model partially, as there were lots of properties. I would have spent time on redundant stuff, not specifically relevant.

I have used local storage to save the catch list. Of course on a real app, it would be better to store it on the BE, this is just
for the purpose of this test.

Design is basic but the application is responsive.

As this is a small test app, and I was working alone on it, I've worked on the main branch.
