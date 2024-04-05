// admin.js
$(document).ready(function() {
    // Fetch and display submitted vendors when page loads
    fetchSubmittedVendors();

    // Function to fetch submitted vendors
    function fetchSubmittedVendors() {
        $.get('/submitted-vendors', function(vendors) {
            displaySubmittedVendors(vendors);
        });
    }

    // Function to display submitted vendors
    function displaySubmittedVendors(vendors) {
        // Code to display vendors (similar to your existing logic)
    }

    // Event listener for approve button
    $('#vendor-list').on('click', '.approve-btn', function() {
        var vendorId = $(this).data('id');
        approveVendor(vendorId);
    });

    // Event listener for reject button
    $('#vendor-list').on('click', '.reject-btn', function() {
        var vendorId = $(this).data('id');
        rejectVendor(vendorId);
    });

    // Function to approve a vendor
    function approveVendor(vendorId) {
        $.ajax({
            url: '/approve-vendor/' + vendorId,
            type: 'PUT',
            success: function() {
                fetchSubmittedVendors(); // Refresh vendor list after approval
            },
            error: function() {
                console.error('Failed to approve vendor');
            }
        });
    }

    // Function to reject a vendor
    function rejectVendor(vendorId) {
        $.ajax({
            url: '/reject-vendor/' + vendorId,
            type: 'PUT',
            success: function() {
                fetchSubmittedVendors(); // Refresh vendor list after rejection
            },
            error: function() {
                console.error('Failed to reject vendor');
            }
        });
    }
});
