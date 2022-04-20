
import { Link } from 'react-router-dom'
import './Card.css';

export const Card = ({ avatar_url, login, html_url}) => {
    return (
        <>
            <div className="card col-span-2">
                <div className="card-s bg-white p-4 flex flex-col justify-between leading-normal">
                    <div className="flex items-center">
                        <img className="w-10 h-10 rounded-full mr-4" src={avatar_url} alt={login} />
                        <div className="text-sm">
                            <p className="text-gray-900 leading-none">{login}</p>
                            <a href={html_url} target="_blank" >prueba</a>
                        </div>
                    </div>
                    <div >
                        <Link className="link endDisplay" to={`/perfil/${login}`}>
                          Más...
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
