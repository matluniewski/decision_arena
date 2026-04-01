create table if not exists decision_drafts (
    id varchar(36) primary key,
    question varchar(280) not null,
    normalized_question varchar(280) not null,
    proposal_json text not null,
    created_at timestamp with time zone not null
);

create table if not exists shared_results (
    id varchar(36) primary key,
    draft_id varchar(36) not null,
    share_slug varchar(32) not null unique,
    question varchar(280) not null,
    normalized_question varchar(280) not null,
    verdict varchar(280) not null,
    confidence varchar(64) not null,
    result_json text not null,
    created_at timestamp with time zone not null
);

create index if not exists idx_shared_results_share_slug on shared_results(share_slug);
