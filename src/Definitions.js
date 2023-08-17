
function Definitions({ mean, lang }) {

    return (

        <>        
            <h4>{mean.partOfSpeech}</h4>

            {mean.definitions.map((def) => {
                return (
                    <>
                        <p>{def.definition}</p>
                    </>
                )
            })}

            {/* //  <p> {item.meanings[1].definitions[1].definition}</p>
        //  <p> {item.meanings[2].definitions[2].definition}</p>
        //  <p> {item.phonetics[0]}</p> */}
        

        </>
    )
   
}




export default Definitions;
