import logo from '../assets/logo.png';

const Header = () => {
    return <div className="row" style={{ display: "flex", justifyContent: 'flex-end', padding: '1rem' }}>
        <div className="col-7 p-1" style={{ textAlignLast: 'right' }}>
            <div className="text-center fw-bold text-primary mb-2" style={{ fontSize: '24px' }}>شركة تداوي الطبية ( فرعون )</div>
            <div className="text-center fw-bold text-primary mb-2" style={{ fontSize: '24px' }}>Tadawi Medical (GNP)</div>
        </div>

        <div className="col" style={{ textAlign: 'right' }}>
            <img src={logo} style={{ width: "30%" }} alt="" />

        </div>
    </div>
}
export default Header;