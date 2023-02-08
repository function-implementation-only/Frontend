export const muiLabelStyleObj = {
    fontSize: '16px',
    fontWeight: '700',
    marginBottom: '16px',
    color: 'black',
    '&.Mui-focused': {
        fontWeight: '700',
        color: 'black',
    },
}
export const muiSelectStyleObj = {
    '.MuiOutlinedInput-notchedOutline': {
        border: '1px solid var(--gray-250)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '1px solid var(--primary-color)',
    },
}

export const muiSelectMenuPropsObj = {
    PaperProps: {
        sx: {
            border: '1px solid var(--primary-color)',
            boxShadow: 'none',
            marginTop: '9.5px',
        },
    },
}

export const muiMenuItemStyleObj = {
    '&.Mui-selected': {
        backgroundColor: 'var(--primary-color-100)',
        '&:hover': { backgroundColor: 'var(--primary-color-100)' },
        '&.Mui-focusVisible': {
            backgroundColor: 'var(--primary-color-100)',
            '&:hover': { backgroundColor: 'var(--primary-color-100)' },
        },
    },
}
