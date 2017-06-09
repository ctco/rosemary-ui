import {expect, assert} from '../test_helper';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import {findIdentifiables, contains} from '../../src/util/utils';


function generateOptions(name, amount) {
    let result = [];
    for (let i = 0; i < amount; i++) {
        result.push({
            id: i,
            displayString: `${name} ${i}`
        });
    }
    return result;
}


const teams = {
    key: 'teams',
    value: [1, 2, 3],
    options: generateOptions('Teamxx', 6)
};
const persons = {
    key: 'persons',
    value: [3, 5, 10],
    options: generateOptions('Personxx', 6)
};

const groups = [teams, persons];
const grupedGroups = groupBy(groups, 'key');


function groupSelected(groups) {
    return mapValues(groups, (g) => findIdentifiables(g[0].options, g[0].value));
}

function filter(options = [], value) {
    return options.filter((option) => {
        return contains(option.displayString, value);
    });
}

function groupFiltered(groups, value) {
    return mapValues(groups, (g) => filter(g[0].options, value));
}

describe.only('Multiselect controller', () => {
    it('should group by selected', () => {
        assert.deepEqual(groupSelected(grupedGroups), {
            'persons': [
                {id: 3, displayString: 'Personxx 3'},
                {id: 5, displayString: 'Personxx 5'}
            ],
            'teams': [
                {id: 1, displayString: 'Teamxx 1'},
                {id: 2, displayString: 'Teamxx 2'},
                {id: 3, displayString: 'Teamxx 3'}
            ]
        });
    });

    it('should group by filtered out with value', () => {
        assert.deepEqual(groupFiltered(grupedGroups, 'xx 3'), {
            'persons': [
                {id: 3, displayString: 'Personxx 3'}
            ],
            'teams': [
                {id: 3, displayString: 'Teamxx 3'}
            ]
        });
    });

    it('should group by not filter with no value', () => {
        assert.deepEqual(groupFiltered(grupedGroups, ''), {
            'persons': grupedGroups.persons[0].options,
            'teams': grupedGroups.teams[0].options
        });
    });


});