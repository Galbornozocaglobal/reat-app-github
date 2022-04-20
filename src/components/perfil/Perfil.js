import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getUserByUserName } from '../../selectors/getUserByUserName';
import * as moment from 'moment';
import './perfil.css';

export const Perfil = () => {
    const navigate = useNavigate();
    const { user_name } = useParams();

    const [user, setUser] = useState({});

    const lastPath = localStorage.getItem('lastPath') || '/'

    const handleBack = (e) => {
        e.preventDefault();
        navigate('/' + lastPath);
    }

    useEffect(() => {
        async function check() {
            const result = await getUserByUserName(user_name);
            if (result) {
                setUser(result);
                console.log("🚀 ~ file: Perfil.js ~ line 15 ~ check ~ result", result)
            }

        }
        check();
    }, [user_name]);
    const { avatar_url, blog, company, created_at, followers, following, html_url, location, login, name, } = user;
    return (
        <>
            <div className="icons">
                <button className="" onClick={handleBack}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg></button>
            </div>
            <div className="main grid grid-cols-6 justify-items-center gap-4 mt-5">
                <div className="webkit-c col-start-2 col-span-4 place-items-center max-w-xl rounded overflow-hidden shadow-lg">
                    <div className="grid grid-cols-6 justify-items-center gap-4 mt-5">
                        <img className="w-6/12 col-start-2  col-span-4 img" src={avatar_url} alt="Sunset in the mountains" />
                    </div>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{name}</div>
                        <div className="grid grid-cols-2 gap-4">
                            {
                                (location) && <p className="text-gray-700 text-base">
                                    Ubicación : {location}
                                </p>
                            }

                            {
                                (company) && <p className="text-gray-700 text-base">
                                    Compañia : {company}
                                </p>
                            }
                            {
                                (followers) && <p className="col-start-1 text-gray-700 text-base">
                                    Seguidores : {followers}
                                </p>
                            }
                            {
                                (following) && <p className="col-start-2 text-gray-700 text-base">
                                    Siguiendo : {following}
                                </p>
                            }
                            {
                                (login) && <p className="text-gray-700 text-base">
                                    Username : {login}
                                </p>
                            }
                            {
                                (created_at) && <p className="text-gray-700 text-base">
                                    Creado el : {moment(created_at).format('DD/MM/YYYY HH:mm')}
                                </p>
                            }

                        </div>
                    </div>
                    <div className="px-6 pt-4 pb-2 grid grid-cols-6 justify-items-center">
                        {
                            (html_url) &&
                            <span className="inline-block text-center col-start-2 col-end-4  bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"><a className="link" href={html_url} target="_blank">Ir al Perfil de GitHub</a></span>
                        }
                        {
                            (blog) &&
                            <span className="inline-block text-center col-start-4 col-end-6 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"><a className="link" href={blog} target="_blank">Ir al Blog</a></span>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
