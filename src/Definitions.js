
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
        </>
    )   
}




export default Definitions;
