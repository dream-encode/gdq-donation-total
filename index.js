import './main.scss';

class GDQDonations {
    constructor() {
        this.container = document.querySelector( '.gdq-donations > div' );
        this.donationSeed = 10000; // Milliseconds
        this.possibleDonations = [
            5000,
            2500,
            1000,
            1000,
            ...Array( 3 ).fill().map( () => 500 ),
            ...Array( 6 ).fill().map( () => 250 ),
            ...Array( 8 ).fill().map( () => 100 ),
            ...Array( 15 ).fill().map( () => 75 ),
            ...Array( 30 ).fill().map( () => 50 ),
            ...Array( 90 ).fill().map( () => 25 ),
            ...Array( 200 ).fill().map( () => 10 ),
        ];

        this.index = 0;

        this.init();
    }

    init() {
        return new Promise( ( resolve, reject ) => {
            if ( null === this.container ) {
                reject( 'Container does not exist!' );
            }

            this.total        = this.container.querySelector( '.total' );
            this.currentTotal =  Number( this.total.dataset.total );

            this.containerPosition = this.container.getBoundingClientRect();
            this.containerTop      = this.containerPosition.top;
            this.containerBottom   = this.containerPosition.bottom;
            this.containerLeft     = this.containerPosition.left;
            this.containerRight    = this.containerPosition.right;
            this.containerHeight   = this.containerPosition.height;
            this.containerWidth    = this.containerPosition.width;

            this.minTop    = this.containerTop + 40;
            this.minBottom = this.containerTop + this.containerHeight - 30;

            resolve();
        } ).then( () => {
            this.loop();
        } ).catch( e => {
            console.warn( 'GDQ Donations', 'Container does not exist in document!' );
        } );
    }

    addDonation( value ) {
        const amountToAdd = Number( value );
        const donation    = document.createElement( 'div' );
        const amount      = document.createTextNode( `$${ amountToAdd.toString().replace( /\B(?=(\d{3})+(?!\d))/g, "," ) }` );

        const top  = Math.floor( Math.random() * ( this.minBottom - this.minTop ) );
        const left = Math.floor( Math.random() * ( this.containerRight - this.containerLeft ) );

        donation.classList.add( 'donation' );
        donation.style.top  = `${top}px`;
        donation.style.left = `${left}px`;

        donation.appendChild( amount );
        this.container.appendChild( donation );

        donation.classList.add( 'added' );

        if ( amountToAdd >= 20 ) {
            donation.classList.add( 'high' );
        }

        if ( amountToAdd >= 100 ) {
            donation.classList.add( 'large' );
        }

        if ( amountToAdd >= 1000 ) {
            donation.classList.add( 'ultra' );
        }

        let newTotal = this.currentTotal + amountToAdd;

        let interval = setInterval( () => {
            this.total.textContent = `$${ this.currentTotal.toString().replace( /\B(?=(\d{3})+(?!\d))/g, "," ) }`;

            if ( this.currentTotal >= newTotal ) {
                clearInterval( interval );
            }

            ( newTotal - this.currentTotal ) > 500 ? this.currentTotal += ( amountToAdd - 500 ) : this.currentTotal++;
        }, Math.floor( ( 1 / amountToAdd ) * 1000 ) );

        setTimeout( () => {
            donation.parentNode.removeChild( donation );
        }, 5000 );
    }

    loop() {
        this.addDonation( this.possibleDonations[ Math.floor( Math.random() * this.possibleDonations.length ) ] );
        this.index++;

        clearInterval( this.donationInterval );

        // if ( this.index >= 8 ) return;
        let interval = Math.round( Math.random() * this.donationSeed );

        this.donationInterval = setInterval( () => this.loop(), interval );
    }
}

;( function() {
    new GDQDonations();
} )();