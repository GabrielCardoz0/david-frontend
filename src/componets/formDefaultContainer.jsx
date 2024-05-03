import styled from "styled-components";

export default function FormDefaultContainer({children}) {
    return(
        <DefaultFormBackground>
            <div className="maxWidth">
                {children}
            </div>
        </DefaultFormBackground>
    );
};

const DefaultFormBackground = styled.div`   
display: flex;
flex-direction: column;
align-items: center;
padding: 25px 10px;
height: 100vh;
background-color: #ffeeee;
&::-webkit-scrollbar{
    display: none;
}
.box {
    height: 50px;
}

.maxWidth {
    width: 100%;
    max-width: 500px;
    flex-grow: 1;
    height: 100%;
    overflow: scroll;
    &::-webkit-scrollbar{
    display: none;
}
}
`;