import React, { useEffect, useRef, useState } from 'react'
import './InfiniteScroll.css'
import { v4 as uuidv4 } from 'uuid'

export default function InfiniteScroll() {


    const [dataImg, setDataImg] = useState([[], [], []]);
    const [pageIndex, setPageIndex] = useState(1);
    const [searchState, setSearchState] = useState('random')

    /**
     * It fetches data from an API, and then pushes the data into an array.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const infiniteFetchData = () => {
        fetch(`https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searchState}&client_id=iXSXxU1EAqvzAQYru7hl32-pjUU5kyo-uJbkV9obivY`).then((response) => {
                return response.json()
            })
            .then((data) => {

                const imgsReceived = [];

                data.results.forEach((img) => {
                    imgsReceived.push(img.urls.regular)
                })

                const newFreshState = [
                    [...dataImg[0]],
                    [...dataImg[1]],
                    [...dataImg[2]]
                ]

                let index = 0;
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 10; j++){
                        newFreshState[i].push(imgsReceived[index])
                    index++;
                    }
                        
                }

                setDataImg(newFreshState)
            })
    }

    const searchFetchData = () => {
        fetch(`https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searchState}&client_id=iXSXxU1EAqvzAQYru7hl32-pjUU5kyo-uJbkV9obivY`).then((response) => {
                return response.json()
            })
            .then((data) => {

                const imgsReceived = [];

                data.results.forEach((img) => {
                    imgsReceived.push(img.urls.regular)
                })

                const newFreshState = [
                    [],
                    [],
                    []
                ]

                let index = 0;
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 10; j++){
                        newFreshState[i].push(imgsReceived[index])
                    index++;
                    }
                        
                }

                setDataImg(newFreshState)
            })
    }

    useEffect(() => {
        searchFetchData()
    }, [searchState])

    useEffect(() => {
        infiniteFetchData();
    }, [pageIndex])


    const handleSearch = e => {
        e.preventDefault()

        setSearchState(inpRef.current.value)
        setPageIndex(1)
    }

    const inpRef = useRef();

    useEffect(() => {
        window.addEventListener('scroll', infiniteTcheck)

        return () => {
            window.removeEventListener('scroll', infiniteTcheck)
        }
    }, [])

    const infiniteTcheck = () => {
        console.log('hello check');
        const  {scrollTop, scrollHeight, clientHeight} = document.documentElement;

        if(scrollHeight - scrollTop <= clientHeight){
            console.log('bottom');
            setPageIndex(pageIndex => pageIndex + 1)
        }
    }



    return (

        <div className="container">
            <form onSubmit={handleSearch} >
             <label htmlFor="search">Votre recherche</label>
            <input type="text" id='search' ref={inpRef} />   
            </form>
            
            <div className="card-list">
                <div>
                    {dataImg[0].map(img => {
                        return <img key={uuidv4()} src={img} alt='unsplash' />
                    })}
                </div>
                <div>
                {dataImg[1].map(img => {
                        return <img key={uuidv4()} src={img} alt='unsplash' />
                    })}
                </div>
                <div>
                {dataImg[2].map(img => {
                        return <img key={uuidv4()} src={img} alt='unsplash' />
                    })}
                </div>
            </div>
        </div>
    )
}
