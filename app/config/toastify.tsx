import { Id, ToastContainer, toast } from 'react-toastify';
import { BsFillCheckCircleFill, BsFillExclamationCircleFill } from 'react-icons/bs';
import { truncate } from '@/utils/helpers';

const DEFAULT_TIMEOUT = 4000;

type IToastStatusProps = {
    status: 'error' | 'success' | 'pending';
    transaction?: string;
    message?: string;
};

const defaultToastOptions = {
    isLoading: false,
    autoClose: DEFAULT_TIMEOUT,
    closeButton: true,
};

export const renderToast = (
    toastId: Id,
    type: 'success' | 'error' | 'pending',
    msg?: string,
    hash?: string,
    timer?: number,
) => {
    switch (type) {
        case 'success': {
            return toast.update(toastId, {
                render: <ToastStatus status="success" transaction={hash} message={msg} />,
                type: 'success',
                progressStyle: {
                    background: '#4ade80',
                },
                icon: <BsFillCheckCircleFill size="20px" color="#4ade80" />,
                ...defaultToastOptions,
                autoClose: timer || defaultToastOptions.autoClose,
            });
        }
        case 'pending': {
            return toast.loading(
                <ToastStatus status="pending" transaction={hash} message={msg} />,
                {
                    toastId,
                    closeButton: true,
                },
            );
        }
        default: {
            return toast.update(toastId, {
                render: (
                    <ToastStatus
                        status="error"
                        transaction={hash}
                        message={`${String(msg).slice(0, 100)}`}
                    />
                ),
                type: 'error',
                progressStyle: {
                    background: '#f87171',
                },
                icon: <BsFillExclamationCircleFill size="20px" color="#f87171" />,
                ...defaultToastOptions,
                autoClose: timer || defaultToastOptions.autoClose,
            });
        }
    }
};

export const ToastStatus = ({ status, transaction, message }: IToastStatusProps) => {
    const determineText = () => {
        if (!message) {
            switch (status) {
                case 'error':
                    return `${transaction ? 'Error while submitted transaction' : 'Error'}`;
                case 'success':
                    return `${transaction ? 'Transaction completed' : 'Success'}`;
                case 'pending':
                    return `${transaction ? 'Transaction submitted' : 'Loading'}`;
            }
        } else {
            return message;
        }
    };
    return (
        <div className="w-full flex gap-0.5 text-sm justify-between">
            <span>{determineText()}</span>
            {transaction && (
                <a
                    href={`https://etherscan.io/tx/${transaction}`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-accent-light hover:text-accent transition duration-100"
                >
                    {truncate(transaction)}
                </a>
            )}
        </div>
    );
};
