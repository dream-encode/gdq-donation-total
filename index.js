import './main.scss'

;( function(){
    'use strict'

    const main = document.querySelector( '.main' );
    const container = main.querySelector( '.container' );
    const total = container.querySelector( '.total' );

    const containerPosition = container.getBoundingClientRect();
    const minX = containerPosition.left;
    const maxX = containerPosition.right;
    const minY = containerPosition.top + 100;
    const maxY = containerPosition.bottom - 100;

    let currentTotal =  Number( total.dataset.total );

    console.log( 'containerPosition', containerPosition );
    console.log( 'minX', minX );
    console.log( 'maxX', maxX );
    console.log( 'minY', minY );
    console.log( 'maxY', maxY );

    function addDonation( value ) {
        const amountToAdd = Number( value );
        const donation    = document.createElement( 'div' );
        const amount      = document.createTextNode( `$${amountToAdd}` );

        const top  = Math.floor( ( Math.random() * ( maxY - minY ) ) + minY / 2 );
        const left = Math.floor( ( Math.random() * ( maxX - minX ) ) );

        donation.classList.add( 'donation' );
        donation.style.top  = `${top}px`;
        donation.style.left = `${left}px`;

        donation.appendChild( amount );
        container.appendChild( donation );

        donation.classList.add( 'added' );

        let newTotal = currentTotal + amountToAdd;

        let interval = setInterval( () => {
            total.textContent = `$${currentTotal.toString().replace( /\B(?=(\d{3})+(?!\d))/g, "," )}`;

            if ( currentTotal >= newTotal ) {
                clearInterval( interval );
            }

            currentTotal++;
        }, Math.floor( ( 1 / amountToAdd ) * 1000 ) );

        setTimeout( () => {
            // donation.parentNode.removeChild( donation );
        }, 5000 );
    }

    const possibleDonations = [
        1000,
        500,
        ...Array( 3 ).fill().map( () => 250 ),
        ...Array( 8 ).fill().map( () => 100 ),
        ...Array( 15 ).fill().map( () => 75 ),
        ...Array( 30 ).fill().map( () => 50 ),
        ...Array( 90 ).fill().map( () => 25 ),
        ...Array( 200 ).fill().map( () => 10 ),
    ];

    ( function donationLoop() {
        let interval = Math.round( Math.random() * 5000 ) + 2000;

        setTimeout( () => {
            addDonation( possibleDonations[ Math.floor( Math.random() * possibleDonations.length ) ] );
            donationLoop();
        }, interval );
    }() );
} )();