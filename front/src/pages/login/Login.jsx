import React from 'react'

const Login = () => {
    return (
        <>
            <form className='form'>
                <div class="form-group row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="text" readonly class="form-control" id="staticEmail" value="email@exemplo.com"/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Senha</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="inputPassword" placeholder="Senha"/>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Login