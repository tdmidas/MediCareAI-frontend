import "./Footer.css"
const CustomFooter = () => {
    return (
        <div className="footer" style={{
            textAlign: 'center',
        }}>
            MediCareAI ©{new Date().getFullYear()} Created by MinhDai
        </div>
    );
}

export default CustomFooter;