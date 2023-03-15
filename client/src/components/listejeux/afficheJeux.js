

export function AfficheJeux({affJeu, onClick}){
    return (
        
        <div onClick={() => onClick(affJeu)} className="containerAffjeux">
            <img  className="imgJeux" src ={affJeu.picture} alt={affJeu.title}/>
            <div className="titleAff">{affJeu.title}</div>
        </div>  
      
    );
} 

export function AfficheAllJeux({affAllJeux, onClickItem}){
    return (
    <>
    <div className="listAllJeu">
        {affAllJeux.map((affJeu)=>{
            return (
             <span key={affJeu.id} className="imageJeu">
                <AfficheJeux onClick={onClickItem} affJeu={affJeu} />
             </span>
          )
        })}
        </div>  
    </>
    );
} 