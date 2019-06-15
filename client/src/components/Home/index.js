import React from 'react';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import {getProductsBySell, getProductsByArrival} from '../../actions/products_actions';
import HomeSlider from './home_slider';
import HomePromotion from './home_promotion';
import CardBlock from '../utils/card_block';

class Home extends React.Component {

    componentDidMount() {
        this.props.dispatch(getProductsBySell());
        this.props.dispatch(getProductsByArrival());
    }

    render() {
        const {products} = this.props;
        const {bySell, byArrival} = products;

        if (isEmpty(bySell) && isEmpty(byArrival)) return false;

        return (
            <div>
                <HomeSlider/>
                <CardBlock
                    list={this.props.products.bySell}
                    title="Best Selling Guitars"
                />
                <HomePromotion/>
                <CardBlock
                    list={this.props.products.byArrival}
                    title="New arrivals"
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Home);
