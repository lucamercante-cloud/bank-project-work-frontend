export const Footer = () => {
    return (
        <footer className="w-full border-t border-slate-800/80 bg-[#070913] py-6 px-6 sm:px-12 text-slate-500 text-xs mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <p>Gemit Bank Corporation © 2026</p>
                <div className="flex items-center gap-6">
                    <a href="#privacy" className="hover:text-slate-300 transition-colors underline decoration-slate-700 underline-offset-4">
                        Privacy Policy
                    </a>
                    <a href="#registry" className="hover:text-slate-300 transition-colors">
                        Private Registry
                    </a>
                </div>
            </div>
        </footer>
    );
};