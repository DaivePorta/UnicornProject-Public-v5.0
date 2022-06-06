Public Class GBBiometrico
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
#Region "Biométrico"
    Public Function Crear_Biometrico(ByVal p_FTVBIOM_CODE As String, ByVal p_FTVBIOM_MARCA As String,
                                     ByVal p_FTVBIOM_MODELO As String, ByVal p_FTVBIOM_SERIE As String,
                                     ByVal p_FTVBIOM_SOFTWARE As String, ByVal p_FTVBIOM_VERSION As String,
                                     ByVal p_FTVBIOM_ESTADO_IND As String, ByVal p_FTVBIOM_USUA_ID As String,
                                     ByVal p_FTVBIOM_COMPATIBLE_IND As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFT_INSERTAR_BIOMETRICO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVBIOM_CODE", p_FTVBIOM_CODE, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVBIOM_MARCA", p_FTVBIOM_MARCA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVBIOM_MODELO", p_FTVBIOM_MODELO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVBIOM_SERIE", p_FTVBIOM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVBIOM_SOFTWARE", p_FTVBIOM_SOFTWARE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVBIOM_VERSION", p_FTVBIOM_VERSION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVBIOM_ESTADO_IND", p_FTVBIOM_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVBIOM_USUA_ID", p_FTVBIOM_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVBIOM_COMPATIBLE_IND", p_FTVBIOM_COMPATIBLE_IND, ParameterDirection.Input, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_FTVBIOM_CODE").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Modificar_Biometrico(ByVal p_FTVBIOM_CODE As String, ByVal p_FTVBIOM_MARCA As String,
                                        ByVal p_FTVBIOM_MODELO As String, ByVal p_FTVBIOM_SERIE As String,
                                        ByVal p_FTVBIOM_SOFTWARE As String, ByVal p_FTVBIOM_VERSION As String,
                                        ByVal p_FTVBIOM_ESTADO_IND As String, ByVal p_FTVBIOM_USUA_ID As String,
                                        ByVal p_SALIDA As String, ByVal p_FTVBIOM_COMPATIBLE_IND As String) As String


        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFT_MODIFICAR_BIOMETRICO", CommandType.StoredProcedure)

            'cmd.Parameters.Add(cn.GetNewParameter("@p_FCOSIPE_CODE", p_FCOSIPE_CODE, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVBIOM_CODE", p_FTVBIOM_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVBIOM_MARCA", p_FTVBIOM_MARCA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVBIOM_MODELO", p_FTVBIOM_MODELO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVBIOM_SERIE", p_FTVBIOM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVBIOM_SOFTWARE", p_FTVBIOM_SOFTWARE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVBIOM_VERSION", p_FTVBIOM_VERSION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVBIOM_ESTADO_IND", p_FTVBIOM_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVBIOM_USUA_ID", p_FTVBIOM_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVBIOM_COMPATIBLE_IND", p_FTVBIOM_COMPATIBLE_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", p_SALIDA, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_SALIDA").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Listar_Biometrico(ByVal p_CODE As String, ByVal p_EST As String, _
                                      ByVal p_COM As String, Optional ByVal p_FILTRO As String = "0") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFT_LISTAR_BIOMETRICO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EST", p_EST, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COM", p_COM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FILTRO", p_FILTRO, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
#End Region
End Class
