import './main.scss'

;( function(){
    'use strict'

    const body = document.body;
    const main = document.querySelector( '.main' );
    const container = main.querySelector( '.container' );
    const total = container.querySelector( 'h2' );

	const windowWidth = body.offsetWidth;
    const windowHeight = body.offsetHeight;

    let currentTotal =  Number( total.dataset.total );
    console.log( 'currentTotal', currentTotal );

    function addDonation( value ) {
        const amountToAdd = Number( value );
        const donation = document.createElement( 'div' );
        const amount   = document.createTextNode( `$${amountToAdd}` );

        const top  = Math.floor( Math.random() * windowHeight );
        const left = Math.floor( Math.random() * windowWidth );

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
            donation.parentNode.removeChild( donation );
        }, 5000 );
    }

    ( function donationLoop() {
        let interval = Math.round( Math.random() * 5000 ) + 2000;

        setTimeout( () => {
            addDonation( Math.floor( Math.random() * 100 ) + 1 );
            donationLoop();
        }, interval );
    }() );
} )();