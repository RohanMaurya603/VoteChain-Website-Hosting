// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Contract {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
        string party;
        uint age;
        string qualification;
        string image;
    }

    struct Voter {
        bool hasVoted;
        uint vote;
        bool isRegistered;
    }

    address admin;
    mapping(uint => Candidate) public candidates;
    // mapping(address => bool) public voters;
    mapping(address => Voter) public voters;
    uint public contestantsCount;
    // uint public counter;
    enum PHASE {
        reg,
        voting,
        done
    }
    PHASE public state;

    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    modifier validState(PHASE x) {
        require(state == x);
        _;
    }

    constructor() {
        admin = msg.sender;
        state = PHASE.reg;
        // counter = 0;
    }

    function changeState(PHASE x) public onlyAdmin {
        require(x > state);
        state = x;
    }

    function addContestant(
        string memory _name,
        string memory _party,
        uint _age,
        string memory _qualification,
        string memory _image
    ) public onlyAdmin validState(PHASE.reg) {
        contestantsCount++;
        candidates[contestantsCount] = Candidate(
            contestantsCount,
            _name,
            0,
            _party,
            _age,
            _qualification,
            _image
        );
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](contestantsCount);

        for (uint i = 1; i <= contestantsCount; i++) {
            allCandidates[i - 1] = candidates[i];
        }

        return allCandidates;
    }

    function voterRegisteration(
        address user
    ) public onlyAdmin validState(PHASE.reg) {
        voters[user].isRegistered = true;
    }

    function vote(uint _contestantId) public validState(PHASE.voting) {
        require(voters[msg.sender].isRegistered);
        require(!voters[msg.sender].hasVoted);
        require(_contestantId > 0 && _contestantId <= contestantsCount);
        candidates[_contestantId].voteCount++;
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].vote = _contestantId;
    }

    function getElectionResult() public view returns (Candidate memory) {
        require(state == PHASE.done, "Election is not yet completed");

        Candidate memory winner;
        uint maxVotes = 0;

        for (uint i = 1; i <= contestantsCount; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winner = candidates[i];
            }
        }

        return winner;
    }
}
