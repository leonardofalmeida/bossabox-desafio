import styled from 'styled-components';
import { Link } from '@material-ui/core';

export const Container = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const HeaderContainer = styled.header`
    width: 50%;
    margin: 20px;
`;

export const Actions = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const SearchContainer = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const ContentContainer = styled.section`
    width: 50%;
    margin: 10px;
`;

export const LinkTitle = styled(Link)`
    font-size: 2em;
`;

export const HeaderCard = styled.div`
    display: flex;
    justify-content: space-between;
`;
