function Blog() {
    "use strict";
    return (
        <div className="blog">
            <p>
                <h1>BLOG</h1>
                <h3>My Web Development Experience</h3>
                <p>
                    I have some web dev experience but only front-end design.
                    I'm familar with html and css as well js and react.
                </p>
                <p>
                    Check out user posts, click <a id="posts" href="posts" target="_blank">here</a> (Server side)
                </p>
                <h3>My Database Experience</h3>
                <p>
                    I have no database experience
                </p>
                <h3>Proposed Database Table</h3>
                <p>
                    My "other" database I want to create will be called Bike. The Bike database will hold
                    information about a users bike. Allowing for users to post information about their Bike
                    as well as view other user's bikes.
                </p>
                <p>
                    <ul>
                        <li>id (auto-incrementing primary key): int </li>
                        <li>title (unique name): varchar</li>
                        <li>image_url (url pointing to image): varchar</li>
                        <li>price: decimal</li>
                        <li>year_manufactured: int</li>
                        <li>brand: varchar</li>
                        <li>model: varchar</li>
                        <li>type (e.g., hardtail, full suspension, road): varchar</li>
                        <li>user_id (foreign key to user table): int</li>
                    </ul>
                </p>
                <h3>HW 1 Home Page</h3>
                <p>
                    The things I found easy about this first homework assignment include the css and html tasks.
                    The things I found difficult about this first assignment include using Media query and
                    creating my database structure. As I have never worked on databases, I found it challenging to
                    visualize my "other" database at first. The thing I found most valuable about this assignment
                    was the visualization of our database. I had to do some research in order to fully understand
                    the task and so now I have a slightly better understanding of databases.
                </p>
                <h3>HW 2 Database</h3>
                <p>
                    I don't have any database experience. Honestly, the biggest thing I feared about web development
                    was backend.
                </p>
                <p>
                    The part I found hardest about homework 2 was getting the correct filtered table up on MySQL. Everything
                    else was pretty straight forward and I was able to follow a similar process to the database lab which
                    helped make this homework assignment much easier.
                    Click <a target="_blank" href="docs/Peachey_database.pdf">here</a> to see my database document.
                </p>
                <h3>HW 3 Single Page Assignment</h3>
                <p>
                    The easiest part for me doing this assignment was the implementation of my home.js and editing the
                    blog.js. As for the hardest part, styling my pages in a reusable fashion was proving to be quite difficult.
                    It was hard for me to vizualize the modularity of the stylesheets so that took me a while.
                    The most valuable thing from this module was learning about single page websites and using
                    React components to inject new content into the page without getting redirected to a separate page.
                    I am definitely going to be using this method in the future for a personal website.
                </p>
                <h3>HW 4 JS Object Component</h3>
                <p>
                    The easiest part for me doing this assignment was implementing the basic structure of the JS object.
                    I found that using the lab helped me easily integrate my own JS objects that are correlated to my database.
                    As for the hardest part, I struggled understanding the select functionality. Other than that, the only other
                    thing I found challenging was styling my JS object components as I wanted them to look neat and seamless when
                    multiple are displaying on the page. This homework has taught me valuable lessons on content generation.
                </p>

                <h3>HW 5 Web API's</h3>
                <p>
                    I've never written any database access code other than the stuff in this assignment. This assignment's code
                    included modular driver and connection files that allow for access to the MySQL database. I've learned a lot
                    from this assignment. As someone who has had no prior database experience, learning about Web API's was a great
                    chance to understand how big websites operate with so much data. The part I found the easiest was setting up
                    the json formatting for the data. I've worked with json before, so I am familiar with how it works. As for
                    the hardest part, I found that just making sure I was properly connecting to the database was my biggest issue
                    other than that, since we were provided most of the code, it was fairly straight-forward.
                    Click <a target="_blank" href="docs/WebAPI_db_errors.pdf">here</a> to see my Web API error document.
                </p>
                <p>
                    To see my <strong>List Users API</strong> open up in a new tab,
                    click <a href="webUser/getAll" target="_blank">here</a>.
                </p>
                <p>
                    To see my <strong>List UserBike API</strong> open up in a new tab,
                    click <a href="userBike/getAll" target="_blank">here</a>.
                </p>
                <h3>HW 6 Show Data</h3>
                <p>
                    This has been a challenging homework for me. Initalially, I was fine because I was working on the provided homework folder. 
                    However, integrating this into my own project proved to be quite difficult. After a while of trial and error, I was able to  
                    create a table for my web user database that has the functionality of sort and filter. However, I had significant trouble 
                    replicating that on my bike database. This homework proved to be very vaulable to me as I was able to figure out how sorting 
                    and filtering works as well as how to integrate my database into a pleasant ui.
                </p>

            </p>
        </div>
    );
}