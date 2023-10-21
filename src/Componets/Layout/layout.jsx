import "./layout.css"
const Layout = ({children})=>{
    return<>
    <div style={{minHeight:"100vh"}} className="row align-items-center">
    {children}
    </div>
    </>
}

export default Layout;