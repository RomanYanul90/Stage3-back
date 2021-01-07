import React from 'react'

export const AuthPage = () => {
    return (
        <div>
            <h2>Log in</h2>
            <form>
                <div>
                    <label>Email</label>
                    <input type="text" name="authEmail"/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="authPassword"/>
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}