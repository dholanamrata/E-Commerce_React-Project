import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const ControlledCarousel = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <div className="container-fluid mt-3 p-3 " >
            <div>
                <Carousel activeIndex={index} onSelect={handleSelect} fade>
                    <Carousel.Item className="h-25 border">
                        <img src='https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/c3638d3830f02beb.jpg?q=20' text="First slide" alt='image' className='w-100 d-block' />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img src='https://rukminim2.flixcart.com/fk-p-flap/844/140/image/dd75bf0d7c3bb4b4.jpg?q=50' text="First slide" alt='image' className='w-100 d-block' />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img src='https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/4cd6690ef44564f3.jpg?q=20' text="First slide" alt='image' className='w-100 d-block' />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img src='https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/8a89ee09acc1a9e5.jpg?q=20' text="First slide" alt='image' className='w-100 d-block' />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img src='https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/534fcf0a58f2958d.jpg?q=20' text="First slide" alt='image' className='w-100 d-block' />

                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    );
}

export default ControlledCarousel;