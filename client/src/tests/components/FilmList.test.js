import React from 'react';
import { shallow } from 'enzyme';
import { FilmList } from '../../components/FilmList';
import films from '../fixtures/films';

test('Should render FilmList with films', () => {
    const wrapper = shallow(<FilmList films={films} />);
    expect(wrapper).toMatchSnapshot();
});