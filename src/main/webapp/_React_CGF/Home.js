function Home() {
    "use strict";
    return (
        <div className="home">
            <p>
                Your go to website for all biking related things.
                Use this site to post your ride!
                You can give details about your ride including the type of bike it is,
                the brand of the bike, and the model of the bike.
            </p>
            <img src="pics/mountain_bike.jpg" />
            <p>
                Check out user posts, click <a id="posts" href="posts" target="_blank">here</a> (Server side)
            </p>
            <h1>Database Access</h1>
            <h3>Using Java Classes - Outputs JSON</h3>
            <p>
                If you would like to see my <strong>Simple Database Access API</strong> open up in a new tab,
                click <a href="webUser/getAllSimple" target="_blank">here</a>. This API only
                works locally, does not use many java classes and outputs content type=
                "text/html" which is not very useful. But the code is simple and easy to
                read.
            </p>
            <p>
                If you would like to see my <strong>Reusable Database Access API</strong> open up in a new tab,
                click <a href="webUser/getAll" target="_blank">here</a>. This code is well
                designed and easy for the client to consume because it outputs from java objects
                that have been converted to JSON.
            </p>
            <p>
                If you would like to see my <strong>JSON Class API</strong> open up in a new tab,
                click <a href="jsonClass" target="_blank">here</a>. If the output
                shows up on one line, remember to download and add the JSON View
                extension to Chrome.
            </p>
            <p>
                If you would like to see my <strong>Hello World API</strong> open up in a new tab,
                click <a href="hello" target="_blank">here</a>.
            </p>
        </div>
    );
}