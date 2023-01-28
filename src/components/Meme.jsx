import React from "react"

  export default  function Meme() {
    const [isClick,setIsClick]=React.useState(false);
    React.useEffect(()=>{
            fetch("https://api.imgflip.com/get_memes")
            .then(res=>res.json())
            .then(data=>setAllMemes(data.data.memes))
            // async  ()=> {
            //     const res = await fetch("https://api.imgflip.com/get-memes");
            //     const data=await res.json()
            //     setAllMemes(data.data.memes)
            // }
    },[])
    const [allMemes,setAllMemes]=React.useState([])
    const [meme,setMeme]=React.useState({
    "topText":"",
    "bottomText":"",
    "randomImage":" http://i.imgflip.com/1bij.jpg"})
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(
            prevState =>({
                ...prevState,
                randomImage:url
            })
            )
             }
             function handleChange(event) {
                const {name,value}=event.target;
                setMeme(prevState=>{ 
                    return {
                   ...prevState,
                        [name]:value  
                }}
                            )}
                React.useEffect(()=>{
                    setIsClick(!isClick)
                },[meme])

     return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                    
                >
                    Get a new meme image 🖼
                </button>
            </div> 
            <div className="meme" style={{animation:isClick?"tilt-in-bottom-1 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both":"tilt-in-top-1 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}}>
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
       
     )
   }
