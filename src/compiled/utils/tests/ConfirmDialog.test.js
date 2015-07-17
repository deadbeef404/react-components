define(function(require) {
    var ConfirmDialog = require('drc/utils/ConfirmDialog');
    var PortalMixins = require('drc/mixins/PortalMixins');
    var React = require('react');
    var TestUtils = React.addons.TestUtils;

    describe('ConfirmDialog', function() {
        var okButtonSpy = jasmine.createSpy(),
            cancelButtonSpy = jasmine.createSpy(),
            confirmDialog;

        beforeEach(function() {
            var props = {
                message: 'Message',
                okButtonText: 'Yup',
                cancelButtonText: 'Nope',
                okButtonClickHandler: okButtonSpy,
                cancelButtonClickHandler: cancelButtonSpy,
                okIconClasses: 'okClass',
                cancelIconClasses: 'cancelClass'
            };

            confirmDialog = TestUtils.renderIntoDocument(React.createElement(ConfirmDialog, React.__spread({},  props)));
        });

        describe('closePortal', function(){
            it('invokes portal mixins close after delay', function(done){
                spyOn(PortalMixins, 'closePortal');

                confirmDialog.closePortal();
                setTimeout(function(){
                    expect(PortalMixins.closePortal).toHaveBeenCalled();
                    done();
                }, 10);
            });
        });

        describe('getButtonText', function(){
            it('should return text only if no icon prop', function(){
                var buttonMarkup = confirmDialog.getButtonText('', 'Click Me');

                expect(buttonMarkup).toBeArrayOfSize(1);
                expect(buttonMarkup[0].props.children).toEqual('Click Me');
            });

            it('should return icon if provided', function(){
                var buttonMarkup = confirmDialog.getButtonText('fa-check', 'Click Me');

                expect(buttonMarkup).toBeArrayOfSize(2);
                expect(buttonMarkup[0].props.className).toEqual('fa-check');
                expect(buttonMarkup[1].props.children).toEqual('Click Me');
            });
        });

        describe('render', function() {
            it('should invoke handler and close portal if it does not return false', function() {
                spyOn(confirmDialog, 'closePortal');

                var buttons = TestUtils.scryRenderedDOMComponentsWithTag(confirmDialog, 'button');

                TestUtils.Simulate.click(buttons[0].getDOMNode());

                expect(okButtonSpy).toHaveBeenCalled();
                expect(confirmDialog.closePortal).toHaveBeenCalled();

                confirmDialog.closePortal.calls.reset();

                TestUtils.Simulate.click(buttons[1].getDOMNode());

                expect(cancelButtonSpy).toHaveBeenCalled();
                expect(confirmDialog.closePortal).toHaveBeenCalled();
            });

            it("shouldn't call close portal if handler returns false", function(){
                var falseOkSpy = jasmine.createSpy().and.returnValue(false),
                    falseCancelSpy = jasmine.createSpy().and.returnValue(false);

                confirmDialog = TestUtils.renderIntoDocument(React.createElement(ConfirmDialog, {okButtonClickHandler: falseOkSpy, cancelButtonClickHandler: falseCancelSpy}));
                spyOn(confirmDialog, 'closePortal');

                var buttons = TestUtils.scryRenderedDOMComponentsWithTag(confirmDialog, 'button');

                TestUtils.Simulate.click(buttons[0].getDOMNode());
                expect(okButtonSpy).toHaveBeenCalled();
                expect(confirmDialog.closePortal).not.toHaveBeenCalled();


                TestUtils.Simulate.click(buttons[1].getDOMNode());
                expect(cancelButtonSpy).toHaveBeenCalled();
                expect(confirmDialog.closePortal).not.toHaveBeenCalled();
            })
        });
    });
});
