/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import FavoritesCard from "./FavoritesCard";


const Favorites = () => {

    // eslint-disable-next-line no-unused-vars
    const [favorites, setfavorites] = useState([])

    const [noFound, setnoFound] = useState(false)

    const [isShow, setIsShow] = useState(false)

    const [totalPrice, setTotalPrice] = useState(0);


    useEffect(() => {

        const favoriteItems = JSON.parse(localStorage.getItem('favorites'));

        if (favoriteItems) {
            setfavorites(favoriteItems);

            const total = favoriteItems.reduce((preValue, currentItem) => preValue + currentItem.price, 0);

            setTotalPrice(total)

        }
        else {
            // console.log("no data")
            setnoFound("No data Found");
        }




    }, [])


    const handleRemove = () => {

        localStorage.clear();
        setfavorites([]);
        setnoFound("No data Found");
    }


    return (
        <div>

            {
                noFound ?
                    <p className="h-[80vh] flex justify-center items-center">{noFound}</p>
                    :
                    <div>

                        {


                            favorites.length > 0 && (

                                <div>
                                    <button
                                        onClick={handleRemove} className="px-5 bg-green-300 block  mx-auto">
                                        Delete All
                                    </button>

                                    <h1 className="text-center">Total Price : {totalPrice}</h1>
                                </div>
                            )


                        }

                        <div className=" grid grid-cols-2 gap-5">
                            {
                                isShow ?
                                    favorites.map(phone => <FavoritesCard key={phone.id} phone={phone}> </FavoritesCard>)
                                    :
                                    favorites.slice(0, 2).map(phone => <FavoritesCard key={phone.id} phone={phone}> </FavoritesCard>)

                            }
                        </div>

                        {
                            favorites.length > 2 &&

                            <button
                                onClick={() => setIsShow(!isShow)} className="px-5 bg-green-300 block  mx-auto">

                                {isShow ? "SEE LESS" : "SEE MORE"}

                            </button>

                        }


                    </div>
            }

        </div>
    );
};

export default Favorites;