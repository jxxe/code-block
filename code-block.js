(function() {

const el = wp.element.createElement; // Shorthand for abstracted createElement() method
const __ = wp.i18n.__; // Shorthand for internationalization function
const { registerBlockType, createBlock } = wp.blocks; // Shorthand to register a block
const { PlainText } = wp.blockEditor; // Shorthand for PlainText component
const { SelectControl } = wp.components;

const languages = {
    none: 'None',
    html: 'HTML',
    css: 'CSS',
    javascript: 'JavaScript',
    python: 'Python',
    php: 'PHP',
    ruby: 'Ruby',
    scss: 'SCSS',
    c: 'C',
    cpp: 'C++',
    csharp: 'C#',
    objectivec: 'Objective-C',
    typescript: 'TypeScript',
    swift: 'Swift',
    go: 'Go',
    json: 'JSON',
    sql: 'SQL',
    bash: 'Bash'
}

var keywords = [ __('code'), __('format') ]; // Keywords in addition to programming languages
Object.keys( languages ).forEach( language => { // Get keys of language object
    keywords.push( language ); // Add them to the keywords array (don't translate)
} )

var languageOptions = [];
Object.keys( languages ).forEach( language => {
    languageOptions.push( {
        value: 'language-' + language,
        label: languages[language]
     } );
} )

registerBlockType( 'jxxe/code-block', {
    title: __( 'Code Block' ),
    description: __( 'A block for displaying code with syntax highlighting.' ),
    icon: 'editor-code',
    category: 'common',
    keywords: keywords,

    attributes: {
        code: {
            type: 'string',
            default: '',
            source: 'text',
            selector: 'code'
        },
        language: {
            type: 'string',
            default: 'language-none',
            source: 'attribute',
            selector: 'code',
            attribute: 'class'
        }
    },

    edit: function( props ) {

        function onKeyDown( event ) {
            if( event.keyCode === 9 ) { // Tab press inside textarea: https://jsfiddle.net/2wAzx/13/
                var element = event.target,
                    start = element.selectionStart,
                    end = element.selectionEnd;

                element.value = element.value.substring( 0, start ) + '    ' + element.value.substring( end ); // Add four spaces
                element.selectionStart = element.selectionEnd = start + 4; // Replace cursor

                props.setAttributes( {
                    code: element.value
                } )

                setTimeout( function() {
                    element.focus(); // Refocus textarea
                }, 0 );
            }
        }

        function onChange( value ) {
            props.setAttributes({
                code: value
            })
        }

        return (
            el( 'div', { className: props.className },
                el(
                    SelectControl, {
                        label: __( 'Select Language' ),
                        value: props.attributes.language,
                        onChange: value => {
                            props.setAttributes({
                                language: value
                            })
                        },
                        options: languageOptions
                    }
                ),
                el(
                    PlainText, {
                        className: 'code-block-code',
                        placeholder: 'Paste code here...',
                        value: props.attributes.code,
                        onChange: onChange,
                        onKeyDown: onKeyDown
                    }
                )
            )
        );

    },

    save: function(props) {
        return (
            el( 'pre', {},
                el(
                    'code',
                    { className: props.attributes.language },
                    props.attributes.code
                )
            )
        )
    }

} );

})();