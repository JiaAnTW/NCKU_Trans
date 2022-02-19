import dataMapping from '~/utils/redux/components/modal/dataMapping';
import testCase from './transObjToKeysTable.json';

test('[Utils] transObjToKeysTable should work correctly', () => {
    let result = dataMapping.transObjToKeysTable(testCase, '', 'keyName');
    expect(result).toEqual({
        keysTable: {
            ggbox: [['a']],
            vvbox: [['a', 'value']],
            如來神掌: [['c']],
        },
        instanceAbleTable: {
            ggbox: [
                ['b', 'instance'],
                ['c', 'value', 'instance'],
            ],
        },
    });
    result = dataMapping.transObjToKeysTable(testCase, '', 'value');
    expect(result).toEqual({
        keysTable: {
            '[object Object]': [['a'], ['c']],
        },
        instanceAbleTable: {
            求求你做個人: [['b', 'instance']],
            '[object Object]': [['c', 'value', 'instance']],
        },
    });
    result = dataMapping.transObjToKeysTable(testCase, '', 'controller');
    expect(result).toEqual({
        keysTable: { kkbox: [['a']] },
        instanceAbleTable: {
            kkbox: [
                ['b', 'instance'],
                ['c', 'value', 'instance'],
            ],
        },
    });
    result = dataMapping.transObjToKeysTable(
        testCase,
        '',
        'never_give_up_oh_oh_oh_jump_jump_jump_yeah'
    );
    expect(result).toEqual({
        keysTable: {},
        instanceAbleTable: {},
    });
});
