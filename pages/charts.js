
export default function Charts() {
    return (
        <div>
            {/* <div className=" border pie" id="forty" style={{"--p":"40", "--c":"darkblue", "--b":"10px"}}> 40%</div> */}
             <div id="first-chart" className="pie z-50 animate-two no-round" style={{"--p":"90","--c":"rgba(233, 158, 36, 1)", "--b":"25px"}}> 80%</div>
             <div id="second-chart" className="pie z-30 border animate no-round" style={{"--p":"97","--c":"black","--b":"20px"}}> 60%</div>
             <div id="first-chart" className="pie z-20 animate-three no-round" style={{"--p":"100","--c":"gray", "--b":"15px"}}> 80%</div>
        </div>
    )
}

