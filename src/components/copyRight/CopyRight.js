import React from 'react'
import CopyrightIcon from '@mui/icons-material/Copyright';
import './copyRight.css'

export default function CopyRight() {

    const styles = {
        CopyrightIcon: {           
            fontsize: "5px",
            color: "#2874A6",
        },
        
        footer: {
            bottom: "1px",
            fontsize: "12px",
            //marginleft: "45%",  
            // margin: "auto",  
            position: "fixed",
        }
    }

    return (
        <div>
            <footer style={styles.footer}><CopyrightIcon className='CopyrightIcon' style={styles.CopyrightIcon}></CopyrightIcon>  jelm48@misena.edu.co</footer>
        </div>
    )
}
