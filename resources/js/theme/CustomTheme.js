export default {
    button: {
        base: "group flex items-stretch items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow]",
        fullSized: "w-full",
        color: {
            dark: "text-white bg-gray-800 border border-transparent enabled:hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:enabled:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700",
            failure:
                "text-white bg-red-700 border border-transparent enabled:hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:enabled:hover:bg-red-700 dark:focus:ring-red-900",
            gray: "text-gray-900 bg-white border border-gray-200 enabled:hover:bg-gray-100 enabled:hover:text-cyan-700 :ring-cyan-700 focus:text-cyan-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:enabled:hover:text-white dark:enabled:hover:bg-gray-700 focus:ring-4",
            info: "text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800",
            light: "text-gray-900 bg-white border border-gray-300 enabled:hover:bg-gray-100 focus:ring-4 focus:ring-cyan-300 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:enabled:hover:bg-gray-700 dark:enabled:hover:border-gray-700 dark:focus:ring-gray-700",
            purple: "text-white bg-purple-700 border border-transparent enabled:hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:enabled:hover:bg-purple-700 dark:focus:ring-purple-900",
            success:
                "text-white bg-green-700 border border-transparent enabled:hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:enabled:hover:bg-green-700 dark:focus:ring-green-800",
            warning:
                "text-white bg-yellow-400 border border-transparent enabled:hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900",
            blue: "text-white bg-emerald-500 border border-transparent enabled:hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800",
            cyan: "text-cyan-900 bg-white border border-cyan-300 enabled:hover:bg-cyan-100 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:text-white dark:border-cyan-600 dark:enabled:hover:bg-cyan-700 dark:enabled:hover:border-cyan-700 dark:focus:ring-cyan-700",
            green: "text-green-900 bg-white border border-green-300 enabled:hover:bg-green-100 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:text-white dark:border-green-600 dark:enabled:hover:bg-green-700 dark:enabled:hover:border-green-700 dark:focus:ring-green-700",
            indigo: "text-indigo-900 bg-white border border-indigo-300 enabled:hover:bg-indigo-100 focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:text-white dark:border-indigo-600 dark:enabled:hover:bg-indigo-700 dark:enabled:hover:border-indigo-700 dark:focus:ring-indigo-700",
            lime: "text-lime-900 bg-white border border-lime-300 enabled:hover:bg-lime-100 focus:ring-4 focus:ring-lime-300 dark:bg-lime-600 dark:text-white dark:border-lime-600 dark:enabled:hover:bg-lime-700 dark:enabled:hover:border-lime-700 dark:focus:ring-lime-700",
            pink: "text-pink-900 bg-white border border-pink-300 enabled:hover:bg-pink-100 focus:ring-4 focus:ring-pink-300 dark:bg-pink-600 dark:text-white dark:border-pink-600 dark:enabled:hover:bg-pink-700 dark:enabled:hover:border-pink-700 dark:focus:ring-pink-700",
            red: "text-red-900 bg-white border border-red-300 enabled:hover:bg-red-100 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:text-white dark:border-red-600 dark:enabled:hover:bg-red-700 dark:enabled:hover:border-red-700 dark:focus:ring-red-700",
            teal: "text-teal-900 bg-white border border-teal-300 enabled:hover:bg-teal-100 focus:ring-4 focus:ring-teal-300 dark:bg-teal-600 dark:text-white dark:border-teal-600 dark:enabled:hover:bg-teal-700 dark:enabled:hover:border-teal-700 dark:focus:ring-teal-700",
            yellow: "text-yellow-900 bg-white border border-yellow-300 enabled:hover:bg-yellow-100 focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-600 dark:text-white dark:border-yellow-600 dark:enabled:hover:bg-yellow-700 dark:enabled:hover:border-yellow-700 dark:focus:ring-yellow-700",
            primary:
                "text-white bg-primary-light border border-transparent enabled:hover:bg-primary-medium focus:ring-4 focus:ring-primary-light dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800",
            // "emerald": "text-white bg-emerald-700 border border-transparent enabled:hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800",
        },
        disabled: "cursor-not-allowed opacity-50",
        isProcessing: "cursor-wait",
        spinnerSlot: "absolute h-full top-0 flex items-center animate-fade-in",
        spinnerLeftPosition: {
            xs: "left-2",
            sm: "left-3",
            md: "left-4",
            lg: "left-5",
            xl: "left-6",
        },
        gradient: {
            cyan: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800",
            failure:
                "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800",
            info: "text-white bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 ",
            lime: "text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-lime-300 dark:focus:ring-lime-800",
            pink: "text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-800",
            purple: "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800",
            success:
                "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800",
            teal: "text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800",
        },
        gradientDuoTone: {
            cyanToBlue:
                "text-white bg-gradient-to-r from-cyan-500 to-cyan-500 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800",
            greenToBlue:
                "text-white bg-gradient-to-br from-green-400 to-cyan-600 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800",
            pinkToOrange:
                "text-white bg-gradient-to-br from-pink-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800",
            purpleToBlue:
                "text-white bg-gradient-to-br from-purple-600 to-cyan-500 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800",
            purpleToPink:
                "text-white bg-gradient-to-r from-purple-500 to-pink-500 enabled:hover:bg-gradient-to-l focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800",
            redToYellow:
                "text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-100 dark:focus:ring-red-400",
            tealToLime:
                "text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 enabled:hover:bg-gradient-to-l enabled:hover:from-teal-200 enabled:hover:to-lime-200 enabled:hover:text-gray-900 focus:ring-4 focus:ring-lime-200 dark:focus:ring-teal-700",
        },
        inner: {
            base: "flex items-stretch items-center transition-all duration-200",
            position: {
                none: "",
                start: "rounded-r-none",
                middle: "rounded-none",
                end: "rounded-l-none",
            },
            outline: "border border-transparent bg-gray-50 text-gray-700",
            isProcessingPadding: {
                xs: "pl-8",
                sm: "pl-10",
                md: "pl-12",
                lg: "pl-16",
                xl: "pl-20",
            },
        },
        label: "ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-cyan-200 text-xs font-semibold text-cyan-800",
        outline: {
            color: {
                gray: "border border-gray-900 dark:border-white",
                default: "border-0",
                light: "",
            },
            off: "",
            on: "flex justify-center bg-white text-gray-900 transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white w-full",
            pill: {
                off: "rounded-md",
                on: "rounded-full",
            },
        },
        pill: {
            off: "rounded-lg",
            on: "rounded-full",
        },
        size: {
            xs: "text-xs px-2 py-1",
            sm: "text-sm px-3 py-1.5",
            md: "text-sm px-4 py-2",
            lg: "text-base px-5 py-2.5",
            xl: "text-base px-6 py-3",
        },
    },
    table: {
        root: {
            base: "w-full text-left text-sm text-gray-500 dark:text-gray-400 rounded-lg",
            shadow: "absolute bg-white dark:bg-black w-full h-full top-0 left-0 rounded-lg drop-shadow-md -z-10",
            wrapper: "relative",
        },
        body: {
            base: "group/body",
            cell: {
                base: "group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg px-6 py-4",
            },
        },
        head: {
            base: "group/head text-xs uppercase text-gray-700 dark:text-gray-400",
            cell: {
                base: "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg border-y dark:bg-gray-700 px-6 py-3",
            },
        },
        row: {
            base: "group/row",
            hovered: "hover:bg-secondary-light/25 dark:hover:bg-gray-600",
            striped:
                "odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700",
        },
    },
    sidebar: {
        root: {
            base: "h-screen",
            collapsed: {
                on: "w-16",
                off: "w-72",
            },
            inner: "h-full overflow-y-auto overflow-x-hidden rounded bg-white py-4 px-3 dark:bg-gray-800",
        },
        collapse: {
            button: "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
            icon: {
                base: "h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
                open: {
                    off: "",
                    on: "text-gray-900",
                },
            },
            label: {
                base: "ml-3 flex-1 whitespace-nowrap text-left",
                icon: {
                    base: "h-6 w-6 transition ease-in-out delay-0",
                    open: {
                        on: "rotate-180",
                        off: "",
                    },
                },
            },
            list: "space-y-2 py-2",
        },
        cta: {
            base: "mt-6 rounded-lg p-4 bg-gray-100 dark:bg-gray-700",
            color: {
                blue: "bg-cyan-50 dark:bg-cyan-900",
                dark: "bg-dark-50 dark:bg-dark-900",
                failure: "bg-red-50 dark:bg-red-900",
                gray: "bg-alternative-50 dark:bg-alternative-900",
                green: "bg-green-50 dark:bg-green-900",
                light: "bg-light-50 dark:bg-light-900",
                red: "bg-red-50 dark:bg-red-900",
                purple: "bg-purple-50 dark:bg-purple-900",
                success: "bg-green-50 dark:bg-green-900",
                yellow: "bg-yellow-50 dark:bg-yellow-900",
                warning: "bg-yellow-50 dark:bg-yellow-900",
            },
        },
        item: {
            base: "flex items-center justify-center rounded-lg p-2 text-xl text-gray-400 font-normal hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
            active: "bg-primary-light text-white hover:bg-primary-medium dark:bg-gray-700",
            collapsed: {
                insideCollapse: "group w-full pl-8 transition duration-75",
                noIcon: "font-bold",
            },
            content: {
                base: "px-3 flex-1 whitespace-nowrap",
            },
            icon: {
                base: "h-6 w-6 flex-shrink-0 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
                active: "text-white dark:text-gray-100",
            },
            label: "",
            listItem: "",
        },
        items: {
            base: "",
        },
        itemGroup: {
            base: "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700",
        },
        logo: {
            base: "mb-5 flex items-center pl-2.5",
            collapsed: {
                on: "hidden",
                off: "self-center whitespace-nowrap text-xl font-semibold dark:text-white",
            },
            img: "mr-3 h-6 sm:h-7 lg:h-12",
        },
    },
    avatar: {
        root: {
            base: "flex justify-center items-center space-x-4 rounded",
            bordered: "p-1 ring-2",
            rounded: "rounded-full",
            color: {
                dark: "ring-gray-800 dark:ring-gray-800",
                failure: "ring-red-500 dark:ring-red-700",
                gray: "ring-gray-500 dark:ring-gray-400",
                info: "ring-cyan-400 dark:ring-cyan-800",
                light: "ring-gray-300 dark:ring-gray-500",
                purple: "ring-purple-500 dark:ring-purple-600",
                success: "ring-green-500 dark:ring-green-500",
                warning: "ring-yellow-300 dark:ring-yellow-500",
                pink: "ring-pink-500 dark:ring-pink-500",
            },
            img: {
                base: "rounded",
                off: "relative overflow-hidden bg-gray-100 dark:bg-gray-600",
                on: "",
                placeholder: "absolute w-auto h-auto text-gray-400 -bottom-1",
            },
            size: {
                xs: "w-6 h-6",
                sm: "w-8 h-8",
                md: "w-16 h-16",
                lg: "w-20 h-20",
                xl: "w-36 h-36",
            },
            stacked: "ring-2 ring-gray-300 dark:ring-gray-500",
            statusPosition: {
                "bottom-left": "-bottom-1 -left-1",
                "bottom-center": "-bottom-1 center",
                "bottom-right": "-bottom-1 -right-1",
                "top-left": "-top-1 -left-1",
                "top-center": "-top-1 center",
                "top-right": "-top-1 -right-1",
                "center-right": "center -right-1",
                center: "center center",
                "center-left": "center -left-1",
            },
            status: {
                away: "bg-yellow-400",
                base: "absolute h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-800",
                busy: "bg-red-400",
                offline: "bg-gray-400",
                online: "bg-green-400",
            },
            initials: {
                text: "font-medium text-gray-600 dark:text-gray-300",
                base: "inline-flex overflow-hidden relative justify-center items-center bg-gray-100 dark:bg-gray-600",
            },
        },
        group: {
            base: "flex -space-x-4",
        },
        groupCounter: {
            base: "relative flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 rounded-full ring-2 ring-gray-300 hover:bg-gray-600 dark:ring-gray-500",
        },
    },
    navbar: {
        root: {
            base: "bg-transparent px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4",
            rounded: {
                on: "rounded",
                off: "",
            },
            bordered: {
                on: "border",
                off: "",
            },
            inner: {
                base: "mx-auto flex flex-wrap items-center justify-between",
                fluid: {
                    on: "",
                    off: "container",
                },
            },
        },
        brand: {
            base: "",
        },
        collapse: {
            base: "w-full md:block md:w-auto",
            list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
            hidden: {
                on: "hidden",
                off: "",
            },
        },
        link: {
            base: "block py-2 pr-4 pl-3 md:p-0",
            active: {
                on: "bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-cyan-700",
                off: "border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white",
            },
            disabled: {
                on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
                off: "",
            },
        },
        toggle: {
            base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",
            icon: "h-6 w-6 shrink-0",
        },
    },
    pagination: {
        base: "",
        layout: {
            table: {
                base: "text-sm text-primary-light dark:text-gray-400",
                span: "font-semibold text-gray-900 dark:text-white",
            },
        },
        pages: {
            base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
            showIcon: "inline-flex",
            previous: {
                base: "ml-0 rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
                icon: "h-5 w-5",
            },
            next: {
                base: "rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
                icon: "h-5 w-5",
            },
            selector: {
                base: "w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 enabled:hover:bg-primary-light/30 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
                active: "bg-primary-light text-white hover:bg-red-500 hover:text-white dark:border-gray-700 dark:bg-gray-700 dark:text-white",
                disabled: "opacity-50 cursor-normal",
            },
        },
    },
    label: {
        root: {
            base: "text-sm",
            disabled: "opacity-50",
            colors: {
                default: "text-gray-500 dark:text-white",
                info: "text-cyan-500 dark:text-cyan-600",
                failure: "text-red-700 dark:text-red-500",
                warning: "text-yellow-500 dark:text-yellow-600",
                success: "text-green-700 dark:text-green-500",
            },
        },
    },
    file_upload: {
        root: {
            base: "flex",
        },
        field: {
            base: "relative w-full",
            input: {
                base: "overflow-hidden block w-full border disabled:cursor-not-allowed disabled:opacity-50",
                sizes: {
                    sm: "sm:text-xs",
                    md: "text-sm",
                    lg: "sm:text-md",
                },
                colors: {
                    gray: "bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
                    info: "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
                    failure:
                        "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
                    warning:
                        "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
                    success:
                        "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500",
                },
            },
        },
    },
};
