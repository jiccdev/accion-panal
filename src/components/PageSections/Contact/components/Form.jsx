import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/context/user/UserContext';
import ContactFormServices from '@/services/ContactForm';
import Alert from '@/components/Alert/Alert';

const Form = ({ realtorEmail }) => {
    const [errorMsg, setErrorMsg] = useState({
        allFieldRequierd: '',
        serverEmailError: '',
    });
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        terms: false,
    });

    /** Handle Name change */
    const handleNameChange = (ev) => {
        setFormData({
            ...formData,
            name: ev.target.value,
        });
    };

    /** Handle Phone change */
    const handlePhoneChange = (ev) => {
        setFormData({
            ...formData,
            phone: ev.target.value,
        });
    };

    /** Handle Email change */
    const handleEmailChange = (ev) => {
        setFormData({
            ...formData,
            email: ev.target.value,
        });
    };

    /** Handle Terms and Conditions change */
    const handleTermsChange = (ev) => {
        setFormData({
            ...formData,
            terms: ev.target.checked,
        });
    };

    /** Handle Terms and Conditions change */
    const EmptyForm = () => {
        setFormData({
            ...formData,
            name: '',
            phone: '',
            email: '',
            terms: false,
        });
    };

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        if (
            Object.values(formData).includes('') ||
            formData?.terms === false
        ) {
            setErrorMsg({
                allFieldRequierd:
                    'Por favor, completa todos los campos y acepta los terminos y condiciones',
            });
            return;
        }

        try {
            setLoading(true);
            const response = await ContactFormServices.sendContactForm(
                formData?.name,
                formData?.email,
                formData?.phone,
                realtorEmail
            )
            if (response.success === 'true') {
                setErrorMsg({
                    allFieldRequierd: '',
                    serverEmailError: '',
                });
                setSuccessMsg('Con exito! Un ejecutivo se contactara contigo');
                setLoading(false);
                setTimeout(() => {
                    setSuccessMsg('');
                }, 4000);
            }
            EmptyForm();
            return;

        } catch (error) {
            setLoading(false);
            console.log('error', error);
        }

    }

    return (
        <div className="my-7 flex flex-col items-center ">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
                Contáctanos
            </h1>
            <form onSubmit={onFormSubmit} name='FormSubmit'>
                <div className="w-full flex-1 mt-8">
                    <div className="mx-auto max-w-xs">
                        <div>
                            <label htmlFor="tel" className='block text-base font-semibold'>Nombre:</label>
                            <input
                                className="w-full px-8 py-3 rounded-2xl font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                type="text"
                                id="name"
                                name="name"
                                maxLength={50}
                                value={formData?.name}
                                onChange={handleNameChange}
                                placeholder="Escriba su nombre"
                            />
                        </div>
                        <div className='mt-5'>
                            <label htmlFor="tel" className='block text-base font-semibold'>Teléfono:</label>
                            <input
                                className="w-full px-8 py-3 rounded-2xl font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                placeholder="+56 9 8765 4321"
                                type="text"
                                id="phone"
                                name="phone"
                                pattern="[0-9]{9}"
                                maxLength="9"
                                value={formData?.phone}
                                onChange={handlePhoneChange}
                            />
                        </div>
                        <div className='mt-5'>
                            <label htmlFor="tel" className='block text-base font-semibold'>E-mail:</label>
                            <input
                                className="w-full px-8 py-3 rounded-2xl font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                type="email"
                                id="email"
                                name="email"
                                value={formData?.email}
                                onChange={handleEmailChange}
                                placeholder="ejemplo@gmail.com"
                            />
                        </div>
                        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem] mt-5">
                            <input
                                className="outline-none relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-md border-[0.125rem] border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-panal-orange checked:bg-panal-orange checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#ca6f3b] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-panal-orange dark:checked:bg-panal-orange"
                                id="terms"
                                name="terms"
                                type="checkbox"
                                value={formData?.terms}
                                onChange={handleTermsChange}
                            />
                            <label className="mt-6 text-xs text-gray-600 text-center">
                                Al continuar estas aceptando los
                                <a href="#" className="border-b border-gray-500 border-dotted hover:text-panal-orange hover:border-panal-orange"> términos y condiciones </a>
                                y
                                <a href="#" className="border-b border-gray-500 border-dotted hover:text-panal-orange hover:border-panal-orange"> la politica de privacidad. </a>
                            </label>
                        </div>
                        <div className="mt-5">
                            {errorMsg.allFieldRequierd && (
                                <Alert errorMsg={errorMsg.allFieldRequierd} />)}

                            {successMsg && (
                                <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
                                    role="alert">
                                    {successMsg}
                                </div>)}
                        </div>

                        <div className="my-5 border-b text-center">
                            <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-5 tracking-wide font-semibold bg-panal-orange text-gray-100 w-full py-4 rounded-lg hover:bg-panal-yellow transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        >
                            {loading ? (
                                <div role="status">
                                    <svg
                                        aria-hidden="true"
                                        className="inline w-4 h-4 text-gray-100 animate-spin fill-white"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                        />
                                    </svg>
                                    <span className="sr-only">Cargando...</span>
                                </div>
                            ) : (
                                <span className="ml-3">
                                    Enviar
                                </span>
                            )}

                        </button>

                    </div>

                </div>
            </form>
        </div>
    )
}

export default Form
