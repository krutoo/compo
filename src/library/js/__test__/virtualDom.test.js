import {
	virtualNodeTag,
	createVirtualNode,
	isVirtualNode,
	isSameVirtualNodes,
	isDisplayedPrimitive,
} from '../virtualDom.js';

describe('createVirtualNode()', () => {
	it('should return new empty virtual div', () => {
		expect(createVirtualNode('div')).toEqual({
			[Symbol.toStringTag]: virtualNodeTag,
			type: 'div',
			props: {},
			children: [],
		});
	});
	it('should return new virtual p with text content', () => {
		expect(createVirtualNode('p', null, 'With great power', 'comes great responsibility')).toEqual({
			[Symbol.toStringTag]: virtualNodeTag,
			type: 'p',
			props: {},
			children: ['With great power', 'comes great responsibility'],
		});
	});
	it('should return new virtual div with class and id', () => {
		expect(createVirtualNode('span', { class: 'test-class', id: 'test-id' })).toEqual({
			[Symbol.toStringTag]: virtualNodeTag,
			type: 'span',
			props: { class: 'test-class', id: 'test-id' },
			children: [],
		});
	});
});

describe('isVirtualNode()', () => {
	it('should return true for virtual node', () => {
		expect(isVirtualNode(createVirtualNode('h1'))).toBe(true);
	});
	it('should return false for non virtual nodes', () => {
		[false, 1, '1', null, undefined, {}, [], () => {}].forEach(value => {
			expect(isVirtualNode(value)).toBe(false);
		});
	});
});

describe('isSameVirtualNodes()', () => {
	it('should return true for same primitives', () => {
		expect(isSameVirtualNodes(1, '1')).toBe(true);
		expect(isSameVirtualNodes(1, 1)).toBe(true);
		expect(isSameVirtualNodes(1, 2)).toBe(false);
		expect(isSameVirtualNodes(undefined, null)).toBe(false);
		expect(isSameVirtualNodes(false, null)).toBe(false);
		expect(isSameVirtualNodes(false, {})).toBe(false);
	});
	it('should return true for same type virtual nodes', () => {
		const div1 = createVirtualNode('div');
		const div2 = createVirtualNode('div', null, 'test div 2');
		const span = createVirtualNode('span', null, 'test div 2');
		expect(isSameVirtualNodes(div1, div1)).toBe(true);
		expect(isSameVirtualNodes(span, span)).toBe(true);
		expect(isSameVirtualNodes(div1, div2)).toBe(true);
		expect(isSameVirtualNodes(div1, span)).toBe(false);
	});
});

describe('isDisplayedPrimitive()', () => {
	it('should return true for strings, numbers, true, symbols', () => {
		[true, 1, 0, '1', Symbol('test')].forEach(primitive => {
			expect(isDisplayedPrimitive(primitive)).toBe(true);
		});
	});
	it('should return false for null, false, undefined', () => {
		[false, null, undefined].forEach(primitive => {
			expect(isDisplayedPrimitive(primitive)).toBe(false);
		});
	});
	it('should return false for non primitives', () => {
		[{}, [], Function, /test/g].forEach(value => {
			expect(isDisplayedPrimitive(value)).toBe(false);
		});
	});
});
